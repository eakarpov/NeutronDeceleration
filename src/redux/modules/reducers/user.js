import Actions from '../../Actions';
import {ROLE} from '../../../helpers/enums';

const initialState = {
  authorized: false,
  username: '',
  role: ROLE.UNAUTHORIZED
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.users.loginSuccess: {
      return Object.assign({}, state, {
        authorized: true,
        username: action.payload.username,
        role: action.payload.role
      })
    }
    case Actions.users.loginFailure: {
      return Object.assign({}, state, {authorized: false})
    }
    default:
      return state;
  }
};