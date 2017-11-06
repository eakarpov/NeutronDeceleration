import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootEpic, rootReducer } from './modules/root';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default (hashHistory) => {
  let store;
  const routeMiddleware = routerMiddleware(hashHistory);
  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      rootReducer,
      composeWithDevTools(
        applyMiddleware(epicMiddleware),
        applyMiddleware(routeMiddleware)),
    );
  } else {
    store = createStore(
      rootReducer,
      compose(
        applyMiddleware(epicMiddleware),
        applyMiddleware(routeMiddleware)),
    );
  }
  return store;
}