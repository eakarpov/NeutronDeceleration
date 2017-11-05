import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from "./app/App";
import "mini.css";
import 'rxjs';
import {Provider} from "react-redux";
import configureStore from './redux/store';
import { Route } from 'react-router';
import {ConnectedRouter} from 'react-router-redux';
import Dashboard from "./app/layouts/Dashboard/Dashboard";
import Login from "./app/layouts/Login/Login";
import { createHashHistory } from 'history';

const hashHistory = createHashHistory();
const store = configureStore(hashHistory);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App>
        <ConnectedRouter  history={hashHistory}>
          <div>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login}/>
          </div>
        </ConnectedRouter>
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
