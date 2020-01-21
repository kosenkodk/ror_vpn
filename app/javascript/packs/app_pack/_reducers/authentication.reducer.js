import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        user: state.user,
        password: action.password
      };
    case userConstants.LOGIN_CHECK_CODE2FA_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_CHECK_CODE2FA_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_CHECK_CODE2FA_FAILURE:
      return {
        error: action.error,
      };
    case userConstants.SIGNIN_CHECK_CREDENTIALS_REQUEST:
      return {
        // loggingIn: true,
        user: action.user
      };
    case userConstants.SIGNIN_CHECK_CREDENTIALS_SUCCESS:
      return {
        // loggedIn: true,
        user: action.user,
        password: action.password
      };
    case userConstants.SIGNIN_CHECK_CREDENTIALS_FAILURE:
      return {
        error: action.error,
        user: action.user || state.user,
      };
    case userConstants.SIGNUP_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.SIGNUP_FAILURE:
      return {
        error: action.error
      };
    case userConstants.SET_USER:
      return {
        user: action.user
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}