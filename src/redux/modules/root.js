import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux'
import auth from './epics/auth';
import {  routerReducer } from 'react-router-redux'
import user from './reducers/user';

export const rootEpic = combineEpics(
  auth,
);

export const rootReducer = combineReducers({
  user,
  routing: routerReducer
});