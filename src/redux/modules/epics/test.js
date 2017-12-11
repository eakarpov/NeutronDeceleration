import Actions from "../../Actions";
import dbi from '../../../dbi';
import { testAdded, testAddFailed } from "../actions/test";

export const addTest = action =>
  action
    .ofType(Actions.tests.add)
    .mergeMap(({payload}) =>
      dbi.addTest(payload.question, payload.answers, payload.correctAnswersId, payload.mark)
        .then(added => added ? testAdded() : testAddFailed()));