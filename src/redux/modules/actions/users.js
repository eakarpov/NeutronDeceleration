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

export const loginSuccess = (login, role, name, surname) => {
  return {
    type: Actions.users.loginSuccess,
    payload: {
      username: login,
      role,
      name,
      surname
    }
  }
};

export const addUser = (user, loadList = false) => {
  return {
    type: Actions.users.add,
    payload: {
      user,
      loadList
    }
  }
};

export const userAdded = () => {
  return {
    type: Actions.users.added,
    payload: null
  };
};

export const userFailed = () => {
  return {
    type: Actions.users.addFail,
    payload: null
  };
};

export const listUsers = () => {
  return {
    type: Actions.users.list,
    payload: null
  }
};

export const listUserSucceeded = (users) => {
  return {
    type: Actions.users.listSuccess,
    payload: users
  };
};

export const listUserFailed = () => {
  return {
    type: Actions.users.listFail,
    payload: null
  };
};