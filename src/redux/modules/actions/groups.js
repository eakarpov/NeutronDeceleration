import Actions from '../../Actions';

export const addGroup = (groupName, loadList = false) => {
  return {
    type: Actions.groups.add,
    payload: {
      groupName,
      loadList
    }
  }
};

export const groupAdded = () => {
  return {
    type: Actions.groups.added,
    payload: null
  };
};

export const groupFailed = () => {
  return {
    type: Actions.groups.addFail,
    payload: null
  };
};

export const listGroups = () => {
  return {
    type: Actions.groups.list,
    payload: null
  }
};


export const listGroupSucceeded = (groups) => {
  return {
    type: Actions.groups.listSuccess,
    payload: groups
  };
};

export const listGroupFailed = () => {
  return {
    type: Actions.groups.listFail,
    payload: null
  };
};

export const removeGroup = (name) => {
  return {
    type: Actions.groups.remove,
    payload: name,
  };
};

export const groupRemoved = (group) => {
  return {
    type: Actions.groups.removed,
    payload: group,
  };
};

export const groupRemoveFailed = () => {
  return {
    type: Actions.groups.removeFail,
    payload: null,
  };
};