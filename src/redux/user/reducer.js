import userActionTypes from "./types";

const initialState = {
  currentUser: null,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case userActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error : action.payload,
      }
    default:
      return state;
  }
};

export default userReducer;
