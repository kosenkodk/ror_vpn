import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { urls, config } from 'config';

export const userActions = {
  login,
  signin_check_credentials,
  login_check_code2fa,
  logout,
  signup,
  getAll,
  getUser,
  setUser,
  contactUs,
};

function setUser(user) {
  return {
    type: userConstants.SET_USER, user
  };
}

function getUser() {
  return dispatch => {
    dispatch(request())
    userService.getUser()
      .then(
        user => {
          dispatch(success(user))
        },
        error => {
          dispatch(failure(error))
        }
      )
  }
  function request() { return { type: userConstants.GET_USER_REQUEST } }
  function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        user => {
          dispatch(success(user));
          history.push(config.userUrlAfterSignin);
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function signin_check_credentials(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.signin_check_credentials(email, password)
      .then(
        response => {
          dispatch(success(response.user));
          // dispatch(alertActions.success(response.notice));

          if (user.is2fa) {
            history.push(urls.code2fa.path); // page to check 2fa code
          }
          else {
            dispatch(login(email, password));
          }
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: userConstants.SIGNIN_CHECK_CREDENTIALS_REQUEST, user } }
  function success(user) { return { type: userConstants.SIGNIN_CHECK_CREDENTIALS_SUCCESS, user } }
  function failure(error) { return { type: userConstants.SIGNIN_CHECK_CREDENTIALS_FAILURE, error } }
}

function login_check_code2fa(code) {
  return dispatch => {
    dispatch(request(code));

    userService.login_check_code2fa(code)
      .then(
        user => {
          dispatch(success(user));
          history.push(config.userUrlAfterSignin);
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
          // dispatch(userService.logout());
        }
      );
  };

  function request(user) { return { type: userConstants.LOGIN_CHECK_CODE2FA_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_CHECK_CODE2FA_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_CHECK_CODE2FA_FAILURE, error } }
}

function contactUs(data) {
  return dispatch => {
    dispatch(alertActions.clear())
    dispatch(request({ data }));

    userService.contactUs(data)
      .then(
        response => {
          dispatch(alertActions.success(response.notice));
        },
        error => {
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(contact) { return { type: userConstants.CONTACTUS_REQUEST, contact } }
  // function success(contact) { return { type: userConstants.CONTACTUS_SUCCESS, contact } }
  // function failure(error) { return { type: userConstants.CONTACTUS_FAILURE, error } }
}

function logout() {
  userService.logout();
  history.push(config.urlAfterSignout);
  return { type: userConstants.LOGOUT };
}

function signup(data) {
  return dispatch => {
    dispatch(request(data));

    userService.signup(data)
      .then(
        user => {
          dispatch(success(user));
          history.push(config.userUrlAfterSignin);
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
  function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
  function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };

  function request() { return { type: userConstants.GETALL_REQUEST } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
