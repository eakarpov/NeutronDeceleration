import Actions from "../../Actions";
import dbi from '../../../dbi';
import {
    getAllResults as list,
    gotAllResults,
    getAllResultsFail,
    resultSaved,
    resultSaveFail
} from "../actions/result";

export const getAllResults = action$ =>
  action$
    .ofType(Actions.result.getAllResults)
    .mergeMap(({payload}) =>
      dbi.getAllResults(payload)
        .then(result => result ? gotAllResults(result) : getAllResultsFail()));

export const saveResult = action$ =>
  action$
    .ofType(Actions.result.saveResult)
    .mergeMap(({payload}) =>
      dbi.saveResult(payload.result, payload.userId)
        .then(result => result  
          ? payload.loadList
            ? list(payload.userId)
            : resultSaved() 
          : resultSaveFail()));
