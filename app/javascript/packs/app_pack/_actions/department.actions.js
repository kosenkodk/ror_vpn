
import { departmentConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './'

export const departmentActions = {
  getAll,
}

function getAll() {
  return dispatch => {
    dispatch(request())

    userService.getDepartments()
      .then(
        items => dispatch(success(items)),
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: departmentConstants.GETALL_REQUEST } }
  function success(items) { return { type: departmentConstants.GETALL_SUCCESS, items } }
  // function failure(error) { return { type: departmentConstants.GETALL_FAILURE, error } }
}