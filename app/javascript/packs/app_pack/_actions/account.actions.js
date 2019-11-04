
import { accountConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './'

export const accountActions = {
  changePassword,
}

function changePassword(data) {
  return dispatch => {
    dispatch(request({ data }))
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
