import React from 'react';
import electron from "electron";
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import dbi from '../dbi';
import { ROLE } from "../helpers/enums";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      adminLoggedIn: false
    };
  }

  async componentWillMount() {
    await dbi.init();
    function router (push, route) {
      push(route);
    }
    electron.ipcRenderer.on('transitionTo', (evt, route) => router(this.props.push, route));
  }

  componentDidUpdate() {
    if (!this.state.adminLoggedIn && this.props.user.role === ROLE.ADMIN) {
      electron.ipcRenderer.send('admin_logged_in');
      this.setState({
        adminLoggedIn: true
      });
    }
  }

  render() {
    return <div>
      {this.props.children}
    </div>;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
