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

export const getAllTests = () => {
  return {
    type: Actions.tests.getAllTests,
  }
};

export const gotAllTests = (tests) => {
  return {
    type: Actions.tests.gotAllTests,
    payload: tests,
  }
};

export const getAllTestsFail = () => {
  return {
    type: Actions.tests.getAllTestsFail,
  }
};

export const removeTest = (testId) => {
  return {
    type: Actions.tests.remove,
    payload: testId,
  }
};

export const removedTest = () => {
  return {
    type: Actions.tests.removed,
    payload: null,
  }
};

export const removeTestFail = () => {
  return {
    type: Actions.tests.removeFail,
  }
};

export const getTest = (testId) => {
  return {
    type: Actions.tests.get,
    payload: testId,
  }
};

export const gotTest = (test) => {
  return {
    type: Actions.tests.got,
    payload: test,
  }
};

export const getTestFail = () => {
  return {
    type: Actions.tests.getFail,
  }
};