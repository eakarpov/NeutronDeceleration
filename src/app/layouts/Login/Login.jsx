import React from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../../redux/modules/actions/users';
import TextInput from '../../components/TextInput/TextInput';
import {push} from 'react-router-redux';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.auth = this.auth.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.state = {
      login: '',
      password: '',
    };
  }

  componentWillUpdate(newProps) {
    if (newProps.authorized) this.props.push("/");
  }
  changeLogin(value) {
    this.setState({
      login: value
    });
  }

  changePassword(value) {
    this.setState({
      password: value
    });
  }

  auth() {
    this.props.login(this.state.login, this.state.password);
  }

  render() {
    return (
      <div>
        <h1>Форма авторизации</h1>
        <label>Логин</label><TextInput onInputChange={this.changeLogin} />
        <label>Пароль</label><TextInput onInputChange={this.changePassword} />
        <button onClick={this.auth}>Войти</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.user.authorized
});

const mapDispatchToProps = {
  login: loginUser,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);