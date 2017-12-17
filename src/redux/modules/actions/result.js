import Actions from '../../Actions';

export const saveResult = (result, userId, listLoad = true) => {
  return {
    type: Actions.result.saveResult,
    payload: {
      result,
      userId,
      listLoad
    }
  }
};

export const resultSaved = () => {
  return {
    type: Actions.result.savedResult,
    payload: null
  };
};

export const resultSaveFail = () => {
  return {
    type: Actions.result.saveResultFail,
    payload: null
  };
};

export const getAllResults = (userId) => {
  return {
    type: Actions.result.getAllResults,
    payload: userId
  }
};


export const gotAllResults = (results) => {
  return {
    type: Actions.result.gotAllResults,
    payload: results
  };
};

export const getAllResultsFail = () => {
  return {
    type: Actions.result.getAllResultsFail,
    payload: null
  };
};
