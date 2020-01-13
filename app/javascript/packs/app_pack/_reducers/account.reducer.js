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
        user: action.user
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
    case accountConstants.QR_CODE_REQUEST:
      return {
        loading: true
      }
    case accountConstants.QR_CODE_SUCCESS:
      return {
        notice: action.notice,
        qr_code_url: action.qr_code_url,
      }
    case accountConstants.QR_CODE_FAILURE:
      return {
        error: action.error,
      }
    case accountConstants.CLEAR_ALERTS:
      return {
        ...state,
        loading: false,
        error: '',
        notice: '',
      }
    case accountConstants.ENABLE_2FA_REQUEST:
      return {
        loading: true
      }
    case accountConstants.ENABLE_2FA_SUCCESS:
      return {
        notice: action.notice,
      }
    case accountConstants.ENABLE_2FA_FAILURE:
      return {
        error: action.error,
      }
    case accountConstants.DISABLE_2FA_REQUEST:
      return {
        loading: true
      }
    case accountConstants.DISABLE_2FA_SUCCESS:
      return {
        notice: action.notice,
      }
    case accountConstants.DISABLE_2FA_FAILURE:
      return {
        error: action.error,
      }

    default:
      return state
  }
}