import dbi from './index';
import async from '../helpers/asyncWrapper';

export async function addTestSuite(testSuiteName) {
  const db = dbi.getDb();
  const testSuite = await async(db.find, { testSuiteName });
  if (!!testSuite[0]) {
    return db.insert({ testSuite: {
      testSuiteName,
      tests: []
    }}, () => true);
  } else return false;
}

export async function addTest(testSuiteId, question, answers) {
  const db = dbi.getDb();
  const testSuite = await async(db.find, { _id: testSuiteId });
  if (!!testSuite[0]) return false;
  const newTestSuite = {
    testSuiteName: testSuite.testSuiteName,
    tests: testSuite.tests.push({
      question,
      answers
    })
  };
  return db.update(testSuite, newTestSuite, () => true);
}

export async function removeTest(testSuiteId, questionId) {
  const db = dbi.getDb();
  const testSuite = await async(db.find, { _id: testSuiteId });
  if (!!testSuite[0]) return false;
  const newTestSuite = {
    testSuiteName: testSuite.testSuiteName,
    tests: testSuite.tests.filter(el => el._id !== questionId);
  }
  return db.update(testSuite, newTestSuite, () => true);
}

export async function editAnswers(testSuiteId, questionId, answers) {
  // TODO: update answers;
}