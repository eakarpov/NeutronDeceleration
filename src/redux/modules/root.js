import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import user from './reducers/user';
import error from './reducers/error';
import groups from './reducers/groups';
import users from "./reducers/users";
import test from './reducers/test';
import result from './reducers/result';
import test_single from './reducers/test_single';
import auth from './epics/auth';
import { addGroup, listGroups, removeGroup } from './epics/groups';
import { addUser, changeUser, deleteUser, listUsers } from "./epics/users";
import { addTest, editTest, getAllTests, getTestSuite, removeTest, getTest } from "./epics/test";
import { saveResult, getAllResults } from './epics/result';
import 'rxjs/add/operator/mergeMap';

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