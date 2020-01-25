import { globalConstants } from '../_constants';
// import { bindActionCreators } from 'redux';

export function global(state = {}, action) {
  switch (action.type) {
    case globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_SUCCESS:
      return {
        ...state,
        account_cancellation_reasons: action.account_cancellation_reasons
      };
    case globalConstants.GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.departments
      };
    case globalConstants.IS_MODAL_SHOW:
      return {
        ...state,
        isModalShow: action.isModalShow
      };
    case globalConstants.CLEAR:
      return {};
    case globalConstants.SET_ATTACHMENTS:
      return {
        ...state,
        attachments: action.attachments
      };
    case globalConstants.CLEAR_ATTACHMENTS:
      return {
        ...state,
        attachments: { files: [], previews: [], attachmentsForApi: [] }
      };
    case globalConstants.DELETE_ATTACHMENT:
      return {
        ...state,
        attachments: {
          files: [...state.attachments.files].filter((item, index) => (index !== action.index)),
          previews: [...state.attachments.previews].filter((item, index) => (index !== action.index)),
          attachmentsForApi: [...state.attachments.attachmentsForApi].filter((item, index) => (index !== action.index)),
        }
      };
    default:
      return state
  }
}