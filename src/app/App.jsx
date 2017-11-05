import React from 'react';
import electron from "electron";
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import dbi from '../dbi';

class App extends React.Component {

  async componentWillMount() {
    await dbi.init();
    function router (push, route) {
      push(route);
    }
    electron.ipcRenderer.on('transitionTo', (evt, route) => router(this.props.push, route))
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

export default connect(null, mapDispatchToProps)(App);
