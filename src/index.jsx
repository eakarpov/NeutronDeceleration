import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from "./app/App";
import "mini.css";
import 'rxjs';
import {Provider} from "react-redux";
import configureStore from './redux/store';
import { syncHistoryWithStore } from 'react-router-redux';
import { Route, Router, Switch} from 'react-router';
import Dashboard from "./app/layouts/Dashboard/Dashboard";
import Login from "./app/layouts/Login/Login";
import { createHashHistory } from 'history';

const hashHistory = createHashHistory();
const store = configureStore(hashHistory);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login}/>
          </Switch>
        </Router>
      </App>
    </Provider>
  </AppContainer>,
  document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App');
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <Router history={history}>
            <NextApp/>
          </Router>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
