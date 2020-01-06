
import { userService } from '../_services';
import { alertActions } from './';
import { globalConstants } from '../_constants';

export const globalActions = {
  getDepartments,
  getAccountCancellationReasons
}

function getDepartments() {
  return dispatch => {
    // dispatch(request())
    userService.getDepartments()
      .then(
        items => dispatch(success(items)),
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  // function request() { return { type: globalConstants.GET_DEPARTMENTS_REQUEST } }
  function success(departments) { return { type: globalConstants.GET_DEPARTMENTS_SUCCESS, departments } }
  // function failure(error) { return { type: globalConstants.GET_DEPARTMENTS_FAILURE, error } }
}


function getAccountCancellationReasons() {
  return dispatch => {
    // dispatch(request())
    userService.getAccountCancellationReasons()
      .then(
        items => dispatch(success(items)),
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  // function request() { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_REQUEST } }
  function success(account_cancellation_reasons) { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_SUCCESS, account_cancellation_reasons } }
  // function failure(error) { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_FAILURE, error } }
}
