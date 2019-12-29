
import { accountConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './'

export const accountActions = {
  changePassword,
  changeEmail,
  deleteAccount,
  clearAlerts,
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
    dispatch(request({ data }))
    userService.deleteAccount({ data })
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
