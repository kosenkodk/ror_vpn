import { accountConstants } from '../_constants';

export function account(state = {}, action) {
  switch (action.type) {
    case accountConstants.UPDATE_REQUEST:
      return {
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
    case accountConstants.UPDATE_EMAIL_REQUEST:
      return {
        loading: true,
        error: '',
        notice: ''
      };
    case accountConstants.UPDATE_EMAIL_SUCCESS:
      return {
        notice: action.notice,
      }
    case accountConstants.UPDATE_EMAIL_FAILURE:
      return {
        error: action.error,
      }
    default:
      return state
  }
}