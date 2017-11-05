import Actions from '../../Actions';
import dbi from '../../../dbi';
import {groupAdded, groupFailed, listGroupFailed, listGroupSucceeded} from '../actions/groups';

export const addGroup = action$ =>
  action$
    .ofType(Actions.groups.add)
    .mergeMap(({ payload }) =>
      dbi.registerGroup(payload)
        .then(validated => validated
          ? groupAdded()
          : groupFailed())
    );

export const listGroups = action$ =>
  action$
    .ofType(Actions.groups.list)
    .mergeMap(({ payload }) =>
      dbi.getAllGroups()
        .then(validated => validated.length > 0
          ? listGroupSucceeded(validated)
          : listGroupFailed())
    );