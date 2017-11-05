import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from "react-redux";
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { createHashHistory } from 'history';
import configureStore from './redux/store';
import Dashboard from "./app/layouts/Dashboard/DashboardWrapper";
import Login from "./app/layouts/Login/Login";
import { App } from "./app/App";
import "mini.css";
import 'rxjs';

const hashHistory = createHashHistory();
const store = configureStore(hashHistory);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App>
        <ConnectedRouter history={hashHistory}>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/login" component={Login}/>
          </Switch>
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
          <NextApp/>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
