// Initial State
export const initialState = null;

// Action Types
export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SET_USER = "SET_USER";

// Actions
export const signUp = (payload) => ({
  type: SIGN_UP,
  payload,
});

export const signIn = (payload) => ({
  type: SIGN_IN,
  payload,
});

export const signOut = () => ({
  type: SIGN_OUT,
});

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
