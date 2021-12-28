import { POST_LIST_USER, POST_USER_LOGIN } from "./action/type";
const initialState = {
  userLogged: {},
  listUser: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_LOGIN:
      state.userLogged = { ...action.data };
      return { ...state };
    case POST_LIST_USER:
      [...state.listUser] = action.data;
      return { ...state };
    default:
      return state;
  }
};
