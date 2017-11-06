import Actions from '../../Actions';
import dbi from '../../../dbi';
import {userAdded, listUsers as list, userFailed, listUserFailed, listUserSucceeded} from '../actions/users';

export const addUser = action$ =>
  action$
    .ofType(Actions.users.add)
    .mergeMap(({ payload }) =>
      dbi.registerUser(payload.user)
        .then(validated => validated
          ? payload.loadList
            ? list()
            : userAdded()
          : userFailed())
    );

export const listUsers = action$ =>
  action$
    .ofType(Actions.users.list)
    .mergeMap(({ payload }) =>
      dbi.getAllUsers()
        .then(validated => typeof validated !== 'undefined'
          ? listUserSucceeded(validated)
          : listUserFailed())
    );