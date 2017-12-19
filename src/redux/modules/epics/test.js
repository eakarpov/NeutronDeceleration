import Actions from "../../Actions";
import dbi from '../../../dbi';
import {
  getAllTests as list,
  getAllTestsFail,
  getTestFail,
  gotAllTests,
  gotTest,
  removeTestFail,
  testAddFailed,
  testSuiteGetFail,
  testSuiteGot,
  editTestFail
} from "../actions/test";

export const addTest = action =>
  action
    .ofType(Actions.tests.add)
    .mergeMap(({payload}) =>
      dbi.addTest(payload.question, payload.answers, payload.correctAnswersId, payload.mark)
        .then(added => added ? list() : testAddFailed()));

export const editTest = action =>
  action
    .ofType(Actions.tests.edit)
    .mergeMap(({payload}) =>
      dbi.editTest(payload.question, payload.answers, payload.correctAnswersId, payload.mark, payload.testId)
        .then(edited => edited ? list() : editTestFail()));

export const getTestSuite = action =>
  action
    .ofType(Actions.tests.getTestSuite)
    .mergeMap(() =>
      dbi.generateTestSuite()
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