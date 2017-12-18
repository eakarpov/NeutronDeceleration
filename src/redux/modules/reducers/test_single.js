import Actions from "../../Actions";
const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.tests.got: {
      return action.payload;
    }
    default:
      return state;
  }
};