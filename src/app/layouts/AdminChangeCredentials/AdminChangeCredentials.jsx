import React from 'react';
import PropTypes from 'prop-types';
import TextInput from "../../components/TextInput/TextInput";

class AdminChangeCredentials extends React.Component {

  constructor(props) {
    super(props);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.state = {
      login: '',
      password: '',
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

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

  render() {
    return (
      <div>
        <button onClick={ this.context.router.history.goBack }>Вернуться назад</button>
        <h1>Изменить данные</h1>
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-2">
            <label>Новый логин</label>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-4">
            <TextInput onInputChange={this.changeLogin} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2 col-md-2 col-sm-2">
            <label>Новый пароль</label>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-4">
            <TextInput onInputChange={this.changePassword} />
          </div>
        </div>
        <button onClick={this.auth}>Подтвердить</button>
      </div>
    );
  }

}

export default AdminChangeCredentials;