import React from 'react';
import TextInput from "../../components/TextInput/TextInput";
import BackButton from "../../components/BackButton/BackButton";

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
      <div className="col-sm row">
        <div>
          <BackButton/>
        </div>
        <div className="container">
          <h1>Изменить данные</h1>
          <div className="col-sm row">
            <div className="col-sm-5">
              <label>Новый логин</label>
            </div>
            <div className="col-sm-5">
              <TextInput onInputChange={this.changeLogin} />
            </div>
          </div>
          <div className="col-sm row">
            <div className="col-sm-5">
              <label>Новый пароль</label>
            </div>
            <div className="col-sm-5">
              <TextInput onInputChange={this.changePassword} />
            </div>
          </div>
          <button onClick={this.auth}>Подтвердить</button>
        </div>
      </div>
    );
  }

}

export default AdminChangeCredentials;