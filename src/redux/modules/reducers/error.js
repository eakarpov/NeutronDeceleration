import Actions from "../../Actions";
const initialState = {
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.groups.added: {
      return {
        error: ''
      };
    }
    case Actions.groups.addFail: {
      return {
        error: 'Group has not been added!'
      };
    }
    case Actions.groups.listSuccess: {
      return {
        error: ''
      };
    }
    case Actions.groups.listFail: {
      return {
        error: 'Group list can not be retrieved!'
      };
    }
    default:
      return state;
  }
};