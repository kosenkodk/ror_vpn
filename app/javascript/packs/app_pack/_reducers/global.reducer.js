import { globalConstants } from '../_constants';
// import { bindActionCreators } from 'redux';

export function global(state = {}, action) {
  switch (action.type) {
    case globalConstants.GET_EMAIL_SUBSCRIPTIONS_REQUEST:
      return {
        ...state,
        email_subscriptions: action.response && action.response.email_subscriptions,
        email_subscription_ids: action.response && action.response.email_subscription_ids,
      };
    case globalConstants.GET_EMAIL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        email_subscriptions: action.response && action.response.email_subscriptions,
        email_subscription_ids: action.response && action.response.email_subscription_ids,
      };
    case globalConstants.GET_EMAIL_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case globalConstants.GET_APP_CLIENTS_REQUEST:
      return {
        ...state,
        app_clients: action.app_clients
      };
    case globalConstants.GET_APP_CLIENTS_SUCCESS:
      return {
        ...state,
        app_clients: action.app_clients
      };
    case globalConstants.GET_APP_CLIENTS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case globalConstants.GET_CONFIGS_REQUEST:
      return {
        ...state,
        configs: action.configs
      };
    case globalConstants.GET_CONFIGS_SUCCESS:
      return {
        ...state,
        configs: action.configs
      };
    case globalConstants.GET_CONFIGS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_SUCCESS:
      return {
        ...state,
        account_cancellation_reasons: action.account_cancellation_reasons
      };
    case globalConstants.GET_PAYMENT_METHODS_REQUEST:
      return {
        ...state,
        payment_methods: action.payment_methods
      };
    case globalConstants.GET_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        payment_methods: action.payment_methods
      };
    case globalConstants.GET_PAYMENT_METHODS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case globalConstants.SET_PAYMENT_METHOD:
      return {
        ...state,
        currentPaymentMethod: action.payment_method
      };
    case globalConstants.GET_COUNTRIES_REQUEST:
      return {
        ...state,
        countries: action.countries
      };
    case globalConstants.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.countries
      };
    case globalConstants.GET_COUNTRIES_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case globalConstants.GET_PLANS_REQUEST:
      return {
        ...state,
        plans: action.plans
      };
    case globalConstants.GET_PLANS_SUCCESS:
      return {
        ...state,
        plans: action.plans
      };
    case globalConstants.GET_PLANS_FAILURE:
      return {
        ...state,
        error: action.error
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
    case globalConstants.SET_STEP:
      return {
        ...state,
        step: action.step
      };
    case globalConstants.GET_REFER_LINK_SUCCESS:
      return {
        ...state,
        refer_link: action.refer_link
      };
    default:
      return state
  }
}