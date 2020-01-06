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
    case globalConstants.CLEAR:
      return {};
    default:
      return state
  }
}