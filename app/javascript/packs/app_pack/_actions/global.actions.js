
import { userService } from '../_services';
import { alertActions } from './';
import { globalConstants } from '../_constants';
import { prepareAttachmentForJsonApi, prepareAttachmentForJsonApiAsync } from '../_helpers';

export const globalActions = {
  getCountries,
  getDepartments,
  getPlans,
  setPaymentMethod,
  getPaymentMethods,
  getAccountCancellationReasons,
  setModalShow,
  setAttachments,
  clearAttachments,
  deleteAttachment,
  setStep,
  getReferLink
}

function getCountries() {
  return dispatch => {
    dispatch(request(JSON.parse(localStorage.getItem('countries'))))
    userService.getCountries()
      .then(
        items => {
          localStorage.setItem('countries', JSON.stringify(items))
          dispatch(success(items))
        },
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(countries) { return { type: globalConstants.GET_COUNTRIES_REQUEST, countries } }
  function success(countries) { return { type: globalConstants.GET_COUNTRIES_SUCCESS, countries } }
  function failure(error) { return { type: globalConstants.GET_COUNTRIES_FAILURE, error } }
}

function getPlans() {
  return dispatch => {
    dispatch(request(JSON.parse(localStorage.getItem('tariff_plans'))))
    userService.getPlans()
      .then(
        items => {
          localStorage.setItem('tariff_plans', JSON.stringify(items))
          dispatch(success(items))
        },
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(plans) { return { type: globalConstants.GET_PLANS_REQUEST, plans } }
  function success(plans) { return { type: globalConstants.GET_PLANS_SUCCESS, plans } }
  function failure(error) { return { type: globalConstants.GET_PLANS_FAILURE, error } }
}

function getReferLink() {
  return dispatch => {
    // dispatch(request())
    userService.getReferLink()
      .then(
        response => dispatch(success(response.refer_link)),
        error => {
          dispatch(alertActions.error(error))
        }
      )
  }

  // function request() { return { type: globalConstants.GET_REFER_LINK_REQUEST } }
  function success(refer_link) { return { type: globalConstants.GET_REFER_LINK_SUCCESS, refer_link } }
  // function failure(error) { return { type: globalConstants.GET_REFER_LINK_FAILURE, error } }
}

function setAttachments(files) {
  if (files && files.length > 0) {
    const attachmentsForApi = [...files].map((item) => prepareAttachmentForJsonApi(item));
    const imagePreviews = [...files].map((item, index) => {
      return { file: item, url: URL.createObjectURL(item) };
    });
    return { type: globalConstants.SET_ATTACHMENTS, attachments: { files: files, previews: imagePreviews, attachmentsForApi: attachmentsForApi } };
  }
  return dispatch(clearAttachments())
}

function clearAttachments() {
  return { type: globalConstants.CLEAR_ATTACHMENTS };
}

function deleteAttachment(index) {
  return { type: globalConstants.DELETE_ATTACHMENT, index: index };
}

function setStep(step) {
  return { type: globalConstants.SET_STEP, step }
}

function setModalShow(isModalShow) {
  return dispatch => {
    dispatch(setModalShow(isModalShow))
  }
  function setModalShow(isModalShow) { return { type: globalConstants.IS_MODAL_SHOW, isModalShow } }
}

function setPaymentMethod(payment_method) {
  return { type: globalConstants.SET_PAYMENT_METHOD, payment_method }
}

function getPaymentMethods() {
  return dispatch => {
    dispatch(request(JSON.parse(localStorage.getItem('paymet_methods'))))
    userService.getPaymentMethods()
      .then(
        items => dispatch(success(items)),
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(payment_methods) { return { type: globalConstants.GET_PAYMENT_METHODS_REQUEST, payment_methods } }
  function success(payment_methods) {
    localStorage.setItem('tariff_plans', JSON.stringify(items))
    return { type: globalConstants.GET_PAYMENT_METHODS_SUCCESS, payment_methods }
  }
  function failure(error) { return { type: globalConstants.GET_PAYMENT_METHODS_FAILURE, error } }
}

function getDepartments() {
  return dispatch => {
    // dispatch(request())
    userService.getDepartments()
      .then(
        items => dispatch(success(items)),
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  // function request() { return { type: globalConstants.GET_DEPARTMENTS_REQUEST } }
  function success(departments) { return { type: globalConstants.GET_DEPARTMENTS_SUCCESS, departments } }
  // function failure(error) { return { type: globalConstants.GET_DEPARTMENTS_FAILURE, error } }
}

function getAccountCancellationReasons() {
  return dispatch => {
    // dispatch(request())
    userService.getAccountCancellationReasons()
      .then(
        items => dispatch(success(items)),
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  // function request() { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_REQUEST } }
  function success(account_cancellation_reasons) { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_SUCCESS, account_cancellation_reasons } }
  // function failure(error) { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_FAILURE, error } }
}
