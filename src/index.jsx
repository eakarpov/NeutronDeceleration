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
import UserInstruction from "./app/layouts/instructions/UserInstruction/UserInstruction";
import DeveloperInstruction from "./app/layouts/instructions/DeveloperInstruction/DeveloperInstruction";
import AdminInstruction from "./app/layouts/instructions/AdminInstruction/AdminInstruction";
import AdminChangeCredentials from "./app/layouts/AdminChangeCredentials/AdminChangeCredentials";
import App from "./app/App";
import "./assets/styles/index.scss"
import "./assets/styles/default.css"

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
            <Route path="/admin/change_credentials" component={AdminChangeCredentials} />
            <Route path="/instruction/user" component={UserInstruction} />
            <Route path="/instruction/developer" component={DeveloperInstruction} />
            <Route path="/instruction/admin" component={AdminInstruction} />
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
