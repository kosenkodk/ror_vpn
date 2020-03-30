import { invoiceConstants } from '../_constants';

function get_local_invoices() {
  let invoices = []
  try { invoices = JSON.parse(localStorage.getItem('invoices')) } catch (e) { }
  return invoices
}
const initialState = get_local_invoices ? { invoices: get_local_invoices } : {};

export function invoices(state = initialState, action) {
  switch (action.type) {
    case invoiceConstants.INVOICES_VIEW_REQUEST:
      return {
        ...state,
        loading: true
      };
    case invoiceConstants.INVOICES_VIEW_SUCCESS:
      return {
        ...state,
        notice: action.notice,
        loading: false,
      };
    case invoiceConstants.INVOICES_VIEW_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case invoiceConstants.ADD_INVOICE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case invoiceConstants.ADD_INVOICE_DETAILS_SUCCESS:
      return {
        ...state,
        invoices: action.invoices,
        notice: action.notice,
        loading: false,
      };
    case invoiceConstants.ADD_INVOICE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case invoiceConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case invoiceConstants.GETALL_SUCCESS:
      return {
        invoices: action.invoices,
        notice: action.notice,
        loading: false,
      };
    case invoiceConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state
  }
}