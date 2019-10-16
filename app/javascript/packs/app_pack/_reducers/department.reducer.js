import { departmentConstants } from '../_constants';

export function departments(state = {}, action) {
  switch (action.type) {
    case departmentConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case departmentConstants.GETALL_SUCCESS:
      return {
        items: action.items
      };
    case departmentConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}