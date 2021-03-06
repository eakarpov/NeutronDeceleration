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
      return {
        ...state,
        authorized: true,
        username: action.payload.username,
        role: action.payload.role,
        name: action.payload.name,
        surname: action.payload.surname
      }
    }
    case Actions.users.loginFailure: {
      return {
        ...state,
        authorized: false
      }
    }
    case Actions.users.logout: {
      return {
        initialState
      };
    }
    case Actions.users.changed: {
      return {
        ...state,
        username: action.payload,
      };
    }
    default:
      return state;
  }
};