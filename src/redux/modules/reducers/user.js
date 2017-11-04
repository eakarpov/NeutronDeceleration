import Actions from '../../Actions';

const initialState = {
  authorized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.users.loginSuccess: {
      return Object.assign({}, state, {authorized: true})
    }
    case Actions.users.loginFailure: {
      return Object.assign({}, state, {authorized: false})
    }
    default:
      return state;
  }
};