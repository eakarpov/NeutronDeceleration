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

export const logout = () => {
  return {
    type: Actions.users.logout,
    payload: null,
  };
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

export const deleteUser = (user) => {
  return {
    type: Actions.users.delete,
    payload: user,
  };
};

export const userDeleted = (login) => {
  return {
    type: Actions.users.deleted,
    payload: login,
  };
};

export const userDeleteFail = () => {
  return {
    type: Actions.users.deleteFail,
    payload: null,
  };
};

export const changeUser = (oldL, newL, pass) => {
  return {
    type: Actions.users.change,
    payload: {
      oldLogin: oldL,
      newLoginL: newL,
      password: pass,
      role: 0,
    }
  }
};

export const userChanged = (login) => {
  return {
    type: Actions.users.changed,
    payload: login,
  }
};

export const userChangeFail = () => {
  return {
    type: Actions.users.changeFail,
    payload: null,
  }
};