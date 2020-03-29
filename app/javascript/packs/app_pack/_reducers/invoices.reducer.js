import { invoiceConstants } from '../_constants';

export function invoices(state = {}, action) {
  switch (action.type) {
    case invoiceConstants.ADD_INVOICE_DETAILS_REQUEST:
      return {
        invoices: action.invoices,
        loading: true
      };
    case invoiceConstants.ADD_INVOICE_DETAILS_SUCCESS:
      return {
        invoices: action.invoices,
        notice: action.notice,
      };
    case invoiceConstants.ADD_INVOICE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case invoiceConstants.GETALL_REQUEST:
      return {
        invoices: action.invoices,
        loading: true
      };
    case invoiceConstants.GETALL_SUCCESS:
      return {
        invoices: action.invoices,
        notice: action.notice,
      };
    case invoiceConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state
  }
}