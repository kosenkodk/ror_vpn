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
    case accountConstants.DELETE_ACCOUNT_REQUEST:
      return {
        loading: true,
        error: '',
        notice: ''
      };
    case accountConstants.DELETE_ACCOUNT_SUCCESS:
      return {
        notice: action.notice,
      }
    case accountConstants.DELETE_ACCOUNT_FAILURE:
      return {
        error: action.error,
      }
    case accountConstants.GET_ACCOUNT_CANCEL_REASONS_REQUEST:
      return {
        loading: true,
        error: '',
        notice: '',
      }
    case accountConstants.GET_ACCOUNT_CANCEL_REASONS_SUCCESS:
      return {
        error: action.notice,
        cancel_account_reasons: action.items
      }
    case accountConstants.CANCEL_ACCOUNT_REQUEST:
      return {
        loading: true
      }
    case accountConstants.CANCEL_ACCOUNT_SUCCESS:
      return {
        notice: action.notice,
        user: action.user,
      }
    case accountConstants.CANCEL_ACCOUNT_FAILURE:
      return {
        error: action.error,
      }
    case accountConstants.CLEAR_ALERTS:
      return {
        ...state,
        error: '',
        notice: '',
      }
    default:
      return state
  }
}