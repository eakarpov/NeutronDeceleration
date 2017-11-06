import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './epics/auth';
import { addGroup, listGroups } from './epics/groups';
import user from './reducers/user';
import error from './reducers/error';
import groups from './reducers/group';
import 'rxjs/add/operator/mergeMap';

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