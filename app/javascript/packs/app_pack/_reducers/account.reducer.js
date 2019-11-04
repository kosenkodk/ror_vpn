import { accountConstants } from '../_constants';

export function account(state = {}, action) {
  switch (action.type) {
    case accountConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        notice: ''
      };
    case accountConstants.UPDATE_SUCCESS:
      return {
        notice: action.notice,
      }
    case accountConstants.UPDATE_FAILURE:
      return {
        error: action.error,
      }
    default:
      return state
  }
}