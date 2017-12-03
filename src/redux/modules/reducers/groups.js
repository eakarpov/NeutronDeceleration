import Actions from "../../Actions";
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.groups.listSuccess: {
      return action.payload;
    }
    case Actions.groups.removed: {
      const index = state.findIndex(el => el.groupName === action.payload.groupName);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ]
    }
    default:
      return state;
  }
};