import React from 'react';
import electron from "electron";
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import dbi from '../dbi';

export class App extends React.Component {

  async componentWillMount() {
    await dbi.init();
    electron.ipcRenderer.on('transitionTo', (evt, route) => {
      console.log(route);
      this.props.push(route)
    });
  }

  render() {
    return <div>
      {this.props.children}
    </div>;
  }

}

const mapDispatchToProps = {
  push
};

connect(null, mapDispatchToProps)(App);
