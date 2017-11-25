import Actions from "../../Actions";
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.users.listSuccess: {
      return action.payload;
    }
    case Actions.users.deleted: {
      return [
        ...state.slice(0, state.map(el => el.login).indexOf(action.payload)),
        ...state.slice(state.map(el => el.login).indexOf(action.payload) + 1)
      ]
    }
    default:
      return state;
  }
};