import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {
  render() {
    const { handleSubmit, isError } = this.props;
    return (
      <div>
        {isError
          ? <mark className="secondary">Неправильный логин или пароль</mark>
          : ""}
        <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="login">Логин</label>
          </div>
          <div>
            <Field name="login" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="password">Пароль</label>
          </div>
          <div>
            <Field name="password" component="input" type="password"/>
          </div>
          <button type="submit">Войти</button>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'login'
})(LoginForm);
