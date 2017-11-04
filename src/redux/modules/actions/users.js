import Actions from '../../Actions';

export const loginUser = (login, password) => {
  return {
    type: Actions.users.login,
    payload: {
      login,
      password
    }
  }
};

export const loginFailure = () => {
  return {
    type: Actions.users.loginFailure,
    payload: null
  }
};

export const loginSuccess = (login) => {
  return {
    type: Actions.users.loginSuccess,
    payload: login
  }
};