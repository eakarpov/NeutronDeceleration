import Actions from "../../Actions";

export const addTest = (question, answers, correctAnswersId, mark) => {
  return {
    type: Actions.tests.add,
    payload: {question, answers, correctAnswersId, mark}
  }
};

export const testAdded = () => {
  return {
    type: Actions.tests.added
  }
};

export const testAddFailed = () => {
  return {
    type: Actions.tests.addFail
  }
};

export const getTestSuite = () => {
  return {
    type: Actions.tests.getTestSuite
  }
};

export const testSuiteGot = (test) => {
  return {
    type: Actions.tests.testSuiteGot,
    payload: test
  }
};

export const testSuiteGetFail = () => {
  return {
    type: Actions.tests.testSuiteGetFail
  }
};
