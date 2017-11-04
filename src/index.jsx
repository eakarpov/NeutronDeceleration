import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./app/App";
import { AppContainer } from 'react-hot-loader'
import "mini.css"

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App');
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
