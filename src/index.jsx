import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { remote } from 'electron';
import { App } from "./app/App";
import "mini.css"

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App');
    render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

const db = remote.getGlobal('db');
const doc = {
  hello: 'world'
  , n: 5
  , today: new Date()
  , nedbIsAwesome: true
  , notthere: null
  , notToBeSaved: undefined  // Will not be saved
  , fruits: ['apple', 'orange', 'pear']
  , infos: {name: 'nedb'}
};
db.insert(doc, function (err, newDoc) {
});
db.find({n: 5}, function (err, docs) {
  console.log(docs);
});
