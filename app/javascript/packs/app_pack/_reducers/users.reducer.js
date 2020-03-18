import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.CONTACTUS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GET_USER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        user: action.user
      };
    case userConstants.GET_USER_FAILURE:
      return {
        error: action.error
      };
    case userConstants.REFER_FRIEND_REQUEST:
      return {
        loading: true
      };
    case userConstants.REFER_FRIEND_SUCCESS:
      return {
        notice: action.notice
      };
    case userConstants.REFER_FRIEND_FAILURE:
      return {
        error: action.error
      };
    case userConstants.ADD_PAYMENT_METHOD_REQUEST:
      return {
        user: state.user,
        loading: true
      };
    case userConstants.ADD_PAYMENT_METHOD_SUCCESS:
      return {
        user: { ...state.user, payment_methods: [...state.user.payment_methods, action.payment_method] },
        notice: action.notice,
        payment_method: action.payment_method
      };
    case userConstants.ADD_PAYMENT_METHOD_FAILURE:
      return {
        user: state.user,
        error: action.error
      };
    default:
      return state
  }
}