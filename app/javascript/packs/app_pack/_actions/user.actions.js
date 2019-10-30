import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { config } from 'config';

export const userActions = {
  login,
  logout,
  signup,
  getAll,
  contactUs,
};

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
    dispatch(request({ data }));

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
