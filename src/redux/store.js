import {compose, applyMiddleware, createStore} from "redux";
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './modules/root';
import { routerMiddleware } from 'react-router-redux';

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

export default (hashHistory) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(epicMiddleware),
      applyMiddleware(routerMiddleware(hashHistory))),
  );

  return store;
}