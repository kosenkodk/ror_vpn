
import { invoiceConstants } from '../_constants';
import { userService } from '../_services';
import { globalActions, alertActions } from './';
import { I18n } from 'helpers';

export const invoiceActions = {
  addDetailsToInvoices,
  getAll,
  add,
  view,
  update,
  filterBy,
}

function addDetailsToInvoices(data) {
  return dispatch => {
    dispatch(request());

    userService.updateInvoice(data)
      .then(
        response => {
          dispatch(globalActions.setModalShow(false));
          localStorage.setItem('invoices', JSON.stringify(response.invoices))
          dispatch(success(response.notice, response.invoices));
          dispatch(alertActions.success(response.notice));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request() { return { type: invoiceConstants.ADD_INVOICE_DETAILS_REQUEST } }
  function success(notice, invoices) { return { type: invoiceConstants.ADD_INVOICE_DETAILS_SUCCESS, notice, invoices } }
  function failure(error) { return { type: invoiceConstants.ADD_INVOICE_DETAILS_FAILURE, error } }
}

function getAll() {
  return dispatch => {
    dispatch(request())
    userService.getInvoices()
      .then(
        items => {
          localStorage.setItem('invoices', JSON.stringify(items))
          dispatch(success(items))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: invoiceConstants.GETALL_REQUEST } }
  function success(invoices) { return { type: invoiceConstants.GETALL_SUCCESS, invoices } }
  function failure(error) { return { type: invoiceConstants.GETALL_FAILURE, error } }
}

function add(item) {
  return dispatch => {
    dispatch(request({ item }))
    userService.addInvoice(item)
      .then(
        item => {
          dispatch(success(item))
          dispatch(alertActions.success(item.notice))
        },
        error => {
          dispatch(failure(item))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: invoiceConstants.ADD_REQUEST } }
  function success(item) { return { type: invoiceConstants.ADD_SUCCESS, item } }
  function failure(error) { return { type: invoiceConstants.ADD_FAILURE, error } }
}

function update(item) {
  return dispatch => {
    dispatch(request())
    userService.updateInvoice(item)
      .then(
        item => {
          dispatch(success(item))
          dispatch(alertActions.success(I18n.t('pages.payments.invoices.pay_current_invoice.success')))
        },
        error => {
          dispatch(failure(item))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: invoiceConstants.UPDATE_REQUEST } }
  function success(invoice) { return { type: invoiceConstants.UPDATE_SUCCESS, invoice } }
  function failure(error) { return { type: invoiceConstants.UPDATE_FAILURE, error } }
}

function view(id) {
  return dispatch => {
    dispatch(request({ invoice: id }))
    userService.viewInvoice(id)
      .then(
        item => {
          dispatch(success(item))
          dispatch(alertActions.success(item.notice))
        },
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }
  function request() { return { type: invoiceConstants.VIEW_REQUEST } }
  function success(item) { return { type: invoiceConstants.VIEW_SUCCESS, item } }
  function failure(error) { return { type: invoiceConstants.VIEW_FAILURE, error } }
}

function filterBy({ status = "" } = {}) {
  return { type: invoiceConstants.FILTER_BY, status }
}
