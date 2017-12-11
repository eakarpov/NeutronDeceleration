import dbi from './index';
import async from '../helpers/asyncWrapper';
import { encrypt, descrypt } from '../crypter/textCrypter';

export async function getTestSuites() {
  const db = dbi.getDb();
  const testSuite = await async(db.find, null); //TODO: filter all where testSuiteName field exists
}

export async function getTestSuiteQuestions(id) {
  const db = dbi.getDb();
  const testSuite = await async(db.find, { _id: id });
  if (!!testSuite[0]) return false;
  testSuite.tests.map(el => el.question);
  return {
    testSuiteName: testSuite.testSuiteName,
    questions: testSuite.tests
  };
}

export async function addTest(question, answers, correctAnswersId, mark) {
  const db = dbi.getDb();
  await async(db.insert, { question, answers, correctAnswersId, mark });
  return true;
}

export async function removeTest(testSuiteId, questionId) {
  const db = dbi.getDb();
  const testSuite = await async(db.find, { _id: testSuiteId });
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