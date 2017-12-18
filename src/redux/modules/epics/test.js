import Actions from "../../Actions";
import dbi from '../../../dbi';
import {
  getAllTestsFail, gotAllTests, testAdded, testAddFailed,
  testSuiteGetFail, testSuiteGot, removeTestFail, removedTest, getAllTests as list, gotTest, getTestFail
} from "../actions/test";

export const addTest = action =>
  action
    .ofType(Actions.tests.add)
    .mergeMap(({payload}) =>
      dbi.addTest(payload.question, payload.answers, payload.correctAnswersId, payload.mark)
        .then(added => added ? testAdded() : testAddFailed()));

export const getTestSuite = action =>
  action
    .ofType(Actions.tests.getTestSuite)
    .mergeMap(({payload}) =>
      dbi.generateTestSuite(payload)
        .then(testSuite => testSuite ? testSuiteGot(testSuite) : testSuiteGetFail()));

export const getAllTests = action =>
  action
    .ofType(Actions.tests.getAllTests)
    .mergeMap(({payload}) =>
      dbi.getAllTests(payload)
        .then(tests => tests ? gotAllTests(tests) : getAllTestsFail()));

export const removeTest = action$ =>
  action$
    .ofType(Actions.tests.remove)
    .mergeMap(({payload}) =>
      dbi.removeTest(payload)
        .then(result => result ? list() : removeTestFail()));

export const getTest = action$ =>
  action$
    .ofType(Actions.tests.get)
    .mergeMap(({payload}) =>
      dbi.getTest(payload)
        .then(result => result ? gotTest(result) : getTestFail()));