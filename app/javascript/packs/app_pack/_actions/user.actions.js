import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { urls, config } from 'config';
import { globalActions } from './global.actions';

export const userActions = {
  login,
  signin_check_credentials,
  login_check_code2fa,
  logout,
  signup,
  getAll,
  getUser,
  setUser,
  addPaymentMethod,
  deletePaymentMethodById,
  contactUs,
  refer_friend,
};

function deletePaymentMethodById(id) {
  return dispatch => {
    dispatch(request());

    userService.deletePaymentMethodById(id)
      .then(
        response => {
          dispatch(globalActions.setModalShow(false));
          dispatch(success(response.notice, id));
          dispatch(alertActions.success(response.notice));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request() { return { type: userConstants.DELETE_PAYMENT_METHOD_REQUEST } }
  function success(notice, id) { return { type: userConstants.DELETE_PAYMENT_METHOD_SUCCESS, notice, id } }
  function failure(error) { return { type: userConstants.DELETE_PAYMENT_METHOD_FAILURE, error } }
}

function addPaymentMethod(data) {
  return dispatch => {
    dispatch(request());

    userService.addPaymentMethod(data)
      .then(
        response => {
          dispatch(globalActions.setModalShow(false));
          dispatch(success(response.notice, response.payment_method));
          dispatch(alertActions.success(response.notice));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request() { return { type: userConstants.ADD_PAYMENT_METHOD_REQUEST } }
  function success(notice, payment_method) { return { type: userConstants.ADD_PAYMENT_METHOD_SUCCESS, notice, payment_method } }
  function failure(error) { return { type: userConstants.ADD_PAYMENT_METHOD_FAILURE, error } }
}

function refer_friend(emails) {
  return dispatch => {
    dispatch(request());

    userService.refer_friend({ emails })
      .then(
        response => {
          dispatch(success(response.notice));
          dispatch(alertActions.success(response.notice));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request() { return { type: userConstants.REFER_FRIEND_REQUEST } }
  function success(notice) { return { type: userConstants.REFER_FRIEND_SUCCESS, notice } }
  function failure(error) { return { type: userConstants.REFER_FRIEND_FAILURE, error } }
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
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

function login({ email, password, code2fa }) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login({ email, password, code2fa })
      .then(
        user => {
          dispatch(success(user));
          history.push(config.userUrlAfterSignin);
        },
        error => {
          dispatch(failure(error, password));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error, password) { return { type: userConstants.LOGIN_FAILURE, error, password } }
}

function signin_check_credentials(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.signin_check_credentials(email, password)
      .then(
        response => {
          dispatch(success(response.user, password));
          // dispatch(alertActions.success(response.notice));

          if (response.user.is2fa) {
            history.push(urls.code2fa.path); // page to check 2fa code
          }
          else {
            dispatch(login({ email: email, password: password }));
          }
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: userConstants.SIGNIN_CHECK_CREDENTIALS_REQUEST, user } }
  function success(user, password) { return { type: userConstants.SIGNIN_CHECK_CREDENTIALS_SUCCESS, user, password } }
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
