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
import {addTest, getTestSuite} from "./epics/test";
import test from './reducers/test';

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
  getTestSuite
);

export const rootReducer = combineReducers({
  user,
  users,
  error,
  test,
  groups,
  routing: routerReducer,
  form: formReducer
});