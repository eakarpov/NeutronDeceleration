import React from 'react';
import electron from "electron";
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import dbi from '../dbi';
import { ROLE } from "../helpers/enums";
import { logout } from '../redux/modules/actions/users';

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
    electron.ipcRenderer.on('logout', (evt) => {
      this.props.logout();
      this.props.push('/');
    });
  }

  componentDidUpdate() {
    if (!this.state.adminLoggedIn) {
      if (this.props.user.role === ROLE.ADMIN) {
        electron.ipcRenderer.send('admin_logged_in');
        this.setState({
          adminLoggedIn: true
        });
      } else {
        electron.ipcRenderer.send('user_logged_in');
      }
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
  push,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
