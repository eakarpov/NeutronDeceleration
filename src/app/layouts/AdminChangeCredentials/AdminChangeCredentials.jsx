import React from 'react';
import TextInput from "../../components/TextInput/TextInput";
import BackButton from "../../components/BackButton/BackButton";
import {connect} from "react-redux";
import {changeUser} from "../../../redux/modules/actions/users";
import bcrypt from 'bcryptjs';

class AdminChangeCredentials extends React.Component {

  constructor(props) {
    super(props);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.auth = this.auth.bind(this);
    this.state = {
      login: '',
      password: '',
      message: false,
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

  auth() {
    if (this.state.login !== '' && this.state.password !== '') {
      this.props.changeUser(this.props.user.username, this.state.login, bcrypt.hashSync(this.state.password, 10));
      this.setState({
        message: true
      });
    }
  }

  render() {
    return (
      <div className="col-sm row">
        <div>
          <BackButton/>
        </div>
        <div className="container">
          <h1>Изменить данные</h1>
          <div className="row">
            {this.state.message ? <mark className="tertiary">Данные успешно обновлены</mark> : null}
          </div>
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  changeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminChangeCredentials);