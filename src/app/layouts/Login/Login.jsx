import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { loginUser } from '../../../redux/modules/actions/users';
import * as styles from './Login.module.scss'
import LoginForm from "./LoginForm";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wrongInput: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.authorized) this.props.push("/dashboard");
    else this.setState({wrongInput: true})
  }

  auth = (values) => {
    this.props.login(values.login, values.password);
  };

  render() {
    return (
      <div className={`col-sm-6 col-sm-offset-3 ${styles.login_form}`}>
        <h1>Форма авторизации</h1>
        <LoginForm onSubmit={this.auth} isError={this.state.wrongInput}/>
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