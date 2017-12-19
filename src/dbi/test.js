import dbi from './index';
import async from '../helpers/asyncWrapper';

export async function getAllTests() {
  const db = dbi.getDb();
  const tests = await async(db.find, {});
  return tests.filter(el => el.question !== void 0);
}

function swap(arr, a, b) {
  const temp = arr[b];
  arr[b] = arr[a];
  arr[a] = temp;
  return arr;
}

function shuffleQuestions(questions) {
  let shuffled = [];
  for (let i = questions.length - 1; i > 0; i--) {
    const index = Math.floor(Math.random() * (i + 1));
    shuffled = swap(questions, index, i)
  }
  return shuffled;
}

function shuffleAnswersAndIds(answers, ids) {
  let shuffledAnswers = [];
  let shuffledIds = [];
  for (let i = answers.length - 1; i > 0; i--) {
    const index = Math.floor(Math.random() * (i + 1));
    shuffledAnswers = swap(answers, index, i);
    shuffledIds = swap(ids, index, i);
  }
  return {shuffledAnswers, shuffledIds};
}

export async function generateTestSuite(...args) {
  const db = dbi.getDb();
  const testSuite = await async(db.find, {});
  const questions = testSuite.filter(el => el.question !== void 0);
  for (let i = 0; i < questions.length; i++) {
    const {shuffledAnswers, shuffledIds} = shuffleAnswersAndIds(questions[i].answers, questions[i].correctAnswersId);
    questions[i].answers = shuffledAnswers;
    questions[i].correctAnswersId = shuffledIds;
  }
  const shuffledQuestions = shuffleQuestions(questions);
  return shuffledQuestions.length > 10 ? [...shuffledQuestions.slice(0, 10)] : shuffledQuestions;
}

export async function addTest(question, answers, correctAnswersId, mark) {
  const db = dbi.getDb();
  await async(db.insert, {question, answers, correctAnswersId, mark});
  return true;
}

export async function editTest(question, answers, correctAnswersId, mark, testId) {
  const db = dbi.getDb();
  const findTest = await async(db.find, {_id: testId});
  if (findTest[0] === void 0) return false;
  await async(db.update, findTest[0], {question, answers, correctAnswersId, mark});
  return true;
}

export async function removeTest(questionId) {
  const db = dbi.getDb();
  const testFromBase = await async(db.find, { _id: questionId });
  if (typeof testFromBase[0] === 'undefined') return false;
  await async(db.remove, testFromBase[0]);
  return true;
}

export async function getTest(questionId) {
  const db = dbi.getDb();
  const testFromBase = await async(db.find, { _id: questionId });
  if (typeof testFromBase[0] === 'undefined') return null;
  return testFromBase[0];
}
