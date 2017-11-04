import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.auth = this.auth.bind(this);
  }
  auth() {

  }
  render() {
    return (<div>
      <input ref="login" />
      <input ref="password" />
      <button onClick={this.auth}>Войти</button>
    </div>);
  }
}

export default Login;