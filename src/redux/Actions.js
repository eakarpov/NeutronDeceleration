export default {
  users: {
    login: '@@USERS/LOGIN',
    loginFailure: '@@USERS/LOGIN_FAILURE',
    loginSuccess: '@@USERS/LOGIN_SUCCESS',
    add: '@@USERS/ADD',
    added: '@@USERS/ADDED',
    addFail: '@@USERS/ADD_FAIL',
    list: '@@USERS/LIST',
    listSuccess: '@@USERS/LIST_SUCCESS',
    listFail: '@@USERS/LIST_FAIL',
    delete: '@@USERS/DELETE',
    deleted: '@@USERS/DELETED',
    deleteFail: '@@USERS/DELETE_FAIL',
    change: '@@USERS/CHANGE',
    changed: '@@USERS/CHANGED',
    changeFail: '@@USERS/CHANGE_FAIL',
  },
  groups: {
    add: '@@GROUPS/ADD',
    added: '@@GROUPS/ADDED',
    addFail: '@@GROUPS/ADD_FAIL',
    list: '@@GROUPS/LIST',
    listSuccess: '@@GROUPS/LIST_SUCCESS',
    listFail: '@@GROUPS/LIST_FAIL'
  }
}