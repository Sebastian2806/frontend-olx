import { AUTH_SUCCESS, AUTH_FAIL, SIGNUP_SUCCESS, SIGNUP_FAIL } from '../actions/types';
const initialState = {};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: {
          ...payload,
          isLoggedIn: true,
        },
      };
    case AUTH_FAIL:
      return {
        ...state,
        user: {
          ...payload,
          isLoggedIn: false,
        },
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupStatus: {
          status: payload.status,
        },
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signupStatus: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
