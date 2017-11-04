import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./app/App";
import "mini.css"
import {Provider} from "react-redux";
import configureStore from './redux/store';
import { syncHistoryWithStore } from 'react-router-redux';
import {browserHistory, Route, Router, Switch} from 'react-router';
import Dashboard from "./app/Dashboard/Dashboard";
import Login from "./app/Login/Login";

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Provider store={store}>
  <Router history={history}>
    <App>
      <Switch>
          <Route path="/" component={Dashboard}>
            <Route path="login" component={Login}/>
          </Route>
      </Switch>
    </App>
  </Router>
  </Provider>,
  document.getElementById('root'));
