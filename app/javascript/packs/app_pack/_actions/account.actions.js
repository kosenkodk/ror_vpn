
import { accountConstants } from '../_constants';
import { userService } from '../_services';
import { userActions, alertActions, globalActions } from './';
import { config } from 'config';
import { history } from '../_helpers';

export const accountActions = {
  cancelAccount,
  changePassword,
  changeEmail,
  changePlan,
  deleteAccount,
  clearAlerts,
  getQrCodeUrl,
  enable2FA,
  disable2FA,
  setEmailSubscriptionIds,
}

function enable2FA(data) {
  return dispatch => {
    dispatch(request(data))
    userService.enable2FA(data)
      .then(
        response => {
          dispatch(globalActions.setStep(0));
          dispatch(globalActions.setModalShow(false)) // hide modal show after success response
          dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice, response.is2fa))

          const user = { ...localStorage.getItem('user'), is2fa: response.is2fa }
          dispatch(userActions.setUser(user))
        },
        error => {
          dispatch(globalActions.setStep(3));
          dispatch(alertActions.error(error))
          dispatch(failure(error))
        }
      )
  }
  function request() { return { type: accountConstants.ENABLE_2FA_REQUEST } }
  function success(notice, is2fa) { return { type: accountConstants.ENABLE_2FA_SUCCESS, notice, is2fa } }
  function failure(error) { return { type: accountConstants.ENABLE_2FA_FAILURE, error } }
}

function disable2FA() {
  return dispatch => {
    dispatch(request())
    dispatch(globalActions.setStep(0))
    userService.disable2FA()
      .then(
        response => {
          dispatch(globalActions.setModalShow(false)) // hide modal show after success response
          dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice, response.is2fa))

          const user = { ...localStorage.getItem('user'), is2fa: response.is2fa }
          dispatch(userActions.setUser(user))
        },
        error => {
          dispatch(alertActions.error(error))
          dispatch(failure(error))
        }
      )
  }
  function request() { return { type: accountConstants.DISABLE_2FA_REQUEST } }
  function success(notice, is2fa) { return { type: accountConstants.DISABLE_2FA_SUCCESS, notice, is2fa } }
  function failure(error) { return { type: accountConstants.DISABLE_2FA_FAILURE, error } }
}

function getQrCodeUrl(data) {
  return dispatch => {
    dispatch(request(data))
    userService.getQrCodeUrl(data)
      .then(
        response => {
          // dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice, response.qr_code_url))
        },
        error => {
          dispatch(alertActions.error(error))
          dispatch(failure(error))
        }
      )
  }
  function request() { return { type: accountConstants.QR_CODE_REQUEST } }
  function success(notice, qr_code_url) { return { type: accountConstants.QR_CODE_SUCCESS, notice, qr_code_url } }
  function failure(error) { return { type: accountConstants.QR_CODE_FAILURE, error } }
}

function cancelAccount(data) {
  return dispatch => {
    dispatch(request(data))
    userService.cancelAccount(data)
      .then(
        response => {
          localStorage.setItem('user', JSON.stringify(response.user))
          dispatch(globalActions.setModalShow(false)) // hide modal show after success response
          dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice))
          dispatch(userActions.setUser(response.user))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: accountConstants.CANCEL_ACCOUNT_REQUEST } }
  function success(notice) { return { type: accountConstants.CANCEL_ACCOUNT_SUCCESS, notice } }
  function failure(error) { return { type: accountConstants.CANCEL_ACCOUNT_FAILURE, error } }
}

function clearAlerts() {
  return dispatch => dispatch({ type: accountConstants.CLEAR_ALERTS })
}

function changePassword(data) {
  return dispatch => {
    dispatch(request(data))
    userService.changeLoginPassword(data)
      .then(
        response => {
          dispatch(globalActions.setModalShow(false)) // hide modal show after success response
          dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice))
          // dispatch(alertActions.success(response.notice))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: accountConstants.UPDATE_REQUEST } }
  function success(notice) { return { type: accountConstants.UPDATE_SUCCESS, notice } }
  function failure(error) { return { type: accountConstants.UPDATE_FAILURE, error } }
}

function changePlan(data) {
  return dispatch => {
    dispatch(request(data))
    userService.changePlan(data)
      .then(
        response => {
          dispatch(globalActions.setStep(3)) // 3 - loading indicator 4 - success message
          dispatch(globalActions.setModalShow(false)) // hide modal show after success response
          dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice))
          dispatch(userActions.setUser(response.user))
        },
        error => {
          dispatch(globalActions.setStep(2)); // display an error and stay on the same page
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: accountConstants.CHANGE_PLAN_REQUEST } }
  function success(notice) { return { type: accountConstants.CHANGE_PLAN_SUCCESS, notice } }
  function failure(error) { return { type: accountConstants.CHANGE_PLAN_FAILURE, error } }
}

function setEmailSubscriptionIds(ids) {
  return dispatch => {
    dispatch(request())
    userService.setEmailSubscriptionIds(ids)
      .then(
        response => {
          // dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice))
          dispatch(userActions.setUser(response.user))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: accountConstants.SET_EMAIL_SUBSCRIPTION_REQUEST } }
  function success(notice) { return { type: accountConstants.SET_EMAIL_SUBSCRIPTION_SUCCESS, notice } }
  function failure(error) { return { type: accountConstants.SET_EMAIL_SUBSCRIPTION_FAILURE, error } }
}

function changeEmail(data) {
  return dispatch => {
    dispatch(request({ data }))
    userService.changeLoginEmail(data)
      .then(
        response => {
          dispatch(globalActions.setModalShow(false)) // hide modal show after success response
          dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice))
          dispatch(userActions.setUser(response.user))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: accountConstants.UPDATE_EMAIL_REQUEST } }
  function success(notice) { return { type: accountConstants.UPDATE_EMAIL_SUCCESS, notice } }
  function failure(error) { return { type: accountConstants.UPDATE_EMAIL_FAILURE, error } }
}

function deleteAccount(data) {
  return dispatch => {
    dispatch(request(data))
    userService.deleteAccount(data)
      .then(
        response => {
          dispatch(globalActions.setModalShow(false)) // hide modal show after success response
          history.push(config.urlAfterSignout);
          dispatch(alertActions.success(response.notice))
          dispatch(success(response.notice))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: accountConstants.DELETE_ACCOUNT_REQUEST } }
  function success(notice) { return { type: accountConstants.DELETE_ACCOUNT_SUCCESS, notice } }
  function failure(error) { return { type: accountConstants.DELETE_ACCOUNT_FAILURE, error } }
}
