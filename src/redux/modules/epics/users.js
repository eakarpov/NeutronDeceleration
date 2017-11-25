import Actions from '../../Actions';
import dbi from '../../../dbi';
import {
  userAdded, listUsers as list, userFailed, userDeleted, userDeleteFail, listUserFailed, listUserSucceeded,
  userChanged, userChangeFail
} from '../actions/users';

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

export const deleteUser = action$ =>
  action$
    .ofType(Actions.users.delete)
    .mergeMap(({ payload }) =>
      dbi.removeUser(payload.user)
        .then(deleted => deleted
            ? userDeleted(payload.user)
            : userDeleteFail()
    ));

export const changeUser = action$ =>
  action$
    .ofType(Actions.users.change)
    .mergeMap(({ payload }) =>
      dbi.editUser(payload.oldLogin, { login: payload.newLoginL, password: payload.password, role: payload.role})
        .then(changed => changed
          ? userChanged(payload.newLoginL)
          : userChangeFail()
        )
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