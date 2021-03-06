
import { userService } from '../_services';
import { alertActions } from './';
import { globalConstants } from '../_constants';
import { prepareAttachmentForJsonApi, prepareAttachmentForJsonApiAsync } from '../_helpers';
import { userActions } from './user.actions';

export const globalActions = {
  getEmailSubscriptions,
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
  getReferLink,
  getConfigs,
  getAppClients,
}


function getEmailSubscriptions() {
  return dispatch => {
    dispatch(request(JSON.parse(localStorage.getItem('email_subscriptions'))))
    userService.getEmailSubscriptions()
      .then(
        response => {
          localStorage.setItem('email_subscriptions', JSON.stringify(response))
          dispatch(success(response))
          dispatch(userActions.setUser(response.user))
        },
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(response) { return { type: globalConstants.GET_EMAIL_SUBSCRIPTIONS_REQUEST, response } }
  function success(response) { return { type: globalConstants.GET_EMAIL_SUBSCRIPTIONS_SUCCESS, response } }
  function failure(error) { return { type: globalConstants.GET_EMAIL_SUBSCRIPTIONS_FAILURE, error } }
}


function getAppClients() {
  return dispatch => {
    dispatch(request(JSON.parse(localStorage.getItem('app_clients'))))
    userService.getAppClients()
      .then(
        response => {
          localStorage.setItem('app_clients', JSON.stringify(response.clients))
          dispatch(success(response.clients))
        },
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(app_clients) { return { type: globalConstants.GET_APP_CLIENTS_REQUEST, app_clients } }
  function success(app_clients) { return { type: globalConstants.GET_APP_CLIENTS_SUCCESS, app_clients } }
  function failure(error) { return { type: globalConstants.GET_APP_CLIENTS_FAILURE, error } }
}

function getConfigs() {
  return dispatch => {
    dispatch(request(JSON.parse(localStorage.getItem('configs'))))
    userService.getConfigs()
      .then(
        response => {
          localStorage.setItem('configs', JSON.stringify(response.items))
          dispatch(success(response.items))
        },
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(configs) { return { type: globalConstants.GET_CONFIGS_REQUEST, configs } }
  function success(configs) { return { type: globalConstants.GET_CONFIGS_SUCCESS, configs } }
  function failure(error) { return { type: globalConstants.GET_CONFIGS_FAILURE, error } }
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
    dispatch(request(JSON.parse(localStorage.getItem('payment_methods'))))
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
    localStorage.setItem('payment_methods', JSON.stringify(payment_methods))
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
