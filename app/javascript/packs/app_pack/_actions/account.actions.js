
import { accountConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions, userActions } from './';

export const accountActions = {
  cancelAccount,
  getAccountCancellationReasons,
  changePassword,
  changeEmail,
  deleteAccount,
  clearAlerts,
}

function cancelAccount(data) {
  return dispatch => {
    dispatch(request(data))
    userService.cancelAccount(data)
      .then(
        response => {
          localStorage.setItem('user', JSON.stringify(response.user))
          // dispatch(userActions.getUser()) // get updated user's info (tariff plan)
          dispatch(success(response.notice, response.user))
        },
        error => {
          dispatch(failure(error))
        }
      )
  }
  function request() { return { type: accountConstants.CANCEL_ACCOUNT_REQUEST } }
  function success(notice, user) { return { type: accountConstants.CANCEL_ACCOUNT_SUCCESS, notice, user } }
  function failure(error) { return { type: accountConstants.CANCEL_ACCOUNT_FAILURE, error } }
}

function getAccountCancellationReasons() {
  return dispatch => {
    dispatch(request())

    userService.getAccountCancellationReasons()
      .then(
        items => {
          localStorage.setItem('account_cancellation_reasons', JSON.stringify(items))
          dispatch(success(items))
        },
        error => {
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: accountConstants.GET_ACCOUNT_CANCEL_REASONS_REQUEST } }
  function success(items) { return { type: accountConstants.GET_ACCOUNT_CANCEL_REASONS_SUCCESS, items } }
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
          dispatch(success(response.notice))
          // dispatch(alertActions.success(response.notice))
        },
        error => {
          dispatch(failure(error))
          // dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: accountConstants.UPDATE_REQUEST } }
  function success(notice) { return { type: accountConstants.UPDATE_SUCCESS, notice } }
  function failure(error) { return { type: accountConstants.UPDATE_FAILURE, error } }
}

function changeEmail(data) {
  return dispatch => {
    dispatch(request({ data }))
    userService.changeLoginEmail(data)
      .then(
        response => {
          dispatch(success(response.notice))
        },
        error => {
          dispatch(failure(error))
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
          dispatch(success(response.notice))
        },
        error => {
          dispatch(failure(error))
        }
      )
  }
  function request() { return { type: accountConstants.DELETE_ACCOUNT_REQUEST } }
  function success(notice) { return { type: accountConstants.DELETE_ACCOUNT_SUCCESS, notice } }
  function failure(error) { return { type: accountConstants.DELETE_ACCOUNT_FAILURE, error } }
}
