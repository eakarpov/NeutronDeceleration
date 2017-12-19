import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './epics/auth';
import { addGroup, listGroups, removeGroup } from './epics/groups';
import user from './reducers/user';
import error from './reducers/error';
import groups from './reducers/groups';
import 'rxjs/add/operator/mergeMap';
import { addUser, changeUser, deleteUser, listUsers } from "./epics/users";
import users from "./reducers/users";
import {addTest, editTest, getAllTests, getTestSuite} from "./epics/test";
import test from './reducers/test';
import { saveResult, getAllResults } from './epics/result';
import result from './reducers/result';
import { removeTest } from './epics/test';
import { getTest } from './epics/test';
import test_single from './reducers/test_single';

export const rootEpic = combineEpics(
  auth,
  addGroup,
  listGroups,
  listUsers,
  addUser,
  deleteUser,
  changeUser,
  removeGroup,
  addTest,
  getTestSuite,
  getAllTests,
  getAllResults,
  saveResult,
  removeTest,
  getTest,
  editTest,
);

export const rootReducer = combineReducers({
  user,
  result,
  users,
  error,
  test,
  test_single,
  groups,
  routing: routerReducer,
  form: formReducer
});