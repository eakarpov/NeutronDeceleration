import Actions from '../../Actions';

const initialState = {
  authorized: false,
  username: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.users.loginSuccess: {
      return Object.assign({}, state, {
        authorized: true,
        username: action.payload
      })
    }
    case Actions.users.loginFailure: {
      return Object.assign({}, state, {authorized: false})
    }
    default:
      return state;
  }
};