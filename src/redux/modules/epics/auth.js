import Actions from '../../Actions';
import dbi from '../../../dbi';
import {loginSuccess, loginFailure} from '../actions/users';

export default action$ =>
  action$
    .ofType(Actions.users.login)
    .mergeMap(({ payload }) =>
      dbi.validatePassword(payload.login, payload.password)
        .then(validated => typeof validated !== 'boolean'
            ? loginSuccess(validated.login, validated.role, validated.name, validated.surname)
            : loginFailure())
    );