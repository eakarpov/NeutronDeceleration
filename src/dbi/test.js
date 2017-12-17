import dbi from './index';
import async from '../helpers/asyncWrapper';
import { descrypt, encrypt } from '../crypter/textCrypter';

export async function getTestSuites() {
  const db = dbi.getDb();
  const testSuite = await async(db.find, null); //TODO: filter all where testSuiteName field exists
}

export async function getTestSuiteQuestions(id) {
  const db = dbi.getDb();
  const testSuite = await async(db.find, {_id: id});
  if (!!testSuite[0]) return false;
  testSuite.tests.map(el => el.question);
  return {
    testSuiteName: testSuite.testSuiteName,
    questions: testSuite.tests
  };
}

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

export async function removeTest(testSuiteId, questionId) {
  const db = dbi.getDb();
  const testSuite = await async(db.find, {_id: testSuiteId});
  if (!!testSuite[0]) return false;
  testSuite.tests.filter(el => el._id !== questionId);
  const newTestSuite = {
    testSuiteName: testSuite.testSuiteName,
    tests: testSuite.tests
  };
  await async(db.update, testSuite, newTestSuite);
  return true;
}

export async function editAnswers(testSuiteId, questionId, answers) {
  // TODO: update answers;
}