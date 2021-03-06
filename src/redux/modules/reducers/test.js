import Actions from "../../Actions";
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.tests.testSuiteGot: {
      return action.payload;
    }
    case Actions.tests.gotAllTests: {
      return action.payload;
    }
    default:
      return state;
  }
};