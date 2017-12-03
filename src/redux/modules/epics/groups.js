import Actions from '../../Actions';
import dbi from '../../../dbi';
import {
  groupAdded, listGroups as list, groupFailed, listGroupFailed, listGroupSucceeded,
  groupRemoved, groupRemoveFailed
} from '../actions/groups';

export const addGroup = action$ =>
  action$
    .ofType(Actions.groups.add)
    .mergeMap(({ payload }) =>
      dbi.registerGroup(payload.groupName)
        .then(validated => validated
          ? payload.loadList
            ? list()
            : groupAdded()
          : groupFailed())
    );

export const listGroups = action$ =>
  action$
    .ofType(Actions.groups.list)
    .mergeMap(({ payload }) =>
      dbi.getAllGroups()
        .then(validated => typeof validated !== 'undefined'
          ? listGroupSucceeded(validated)
          : listGroupFailed())
    );

export const removeGroup = action$ =>
    action$
    .ofType(Actions.groups.remove)
    .mergeMap(({ payload }) =>
        dbi.removeGroup(payload)
        .then(validated => validated !== void 0 ? groupRemoved(validated) : groupRemoveFailed()));