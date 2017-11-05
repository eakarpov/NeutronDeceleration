import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux'
import auth from './epics/auth';
import {  routerReducer } from 'react-router-redux'
import user from './reducers/user';
import {addGroup, listGroups} from './epics/groups';
import error from './reducers/error';
import groups from './reducers/group';

export const rootEpic = combineEpics(
  auth,
  addGroup,
  listGroups
);

export const rootReducer = combineReducers({
  user,
  error,
  groups,
  routing: routerReducer
});