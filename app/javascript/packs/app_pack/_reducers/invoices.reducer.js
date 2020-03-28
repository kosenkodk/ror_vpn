import { invoiceConstants } from '../_constants';

export function invoices(state = {}, action) {
  switch (action.type) {
    case invoiceConstants.ADD_INVOICE_DETAILS_REQUEST:
      return {
        loading: true
      };
    case invoiceConstants.ADD_INVOICE_DETAILS_SUCCESS:
      return {
        invoices: action.invoices,
        notice: action.notice,
      };
    case invoiceConstants.ADD_INVOICE_DETAILS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}