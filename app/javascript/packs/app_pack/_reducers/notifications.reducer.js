import { notificationConstants } from '../_constants';

export function notifications(state = {}, action) {
  switch (action.type) {
    case notificationConstants.CREATE_NOTIFIER:
      return {
        ...state,
        notifier: action.notifier
      };
    case notificationConstants.ADD_NOTIFICATION_REQUEST:
      return {
        ...state,
      };
    case notificationConstants.ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [action.notification, ...state.notifications]
      };
    case notificationConstants.ADD_NOTIFICATION_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case notificationConstants.GET_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        notifications: action.notifications.notifications,
        pages: action.notifications.pages,
        page: action.notifications.page
      };
    case notificationConstants.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.notifications.notifications,
        pages: action.notifications.pages,
        page: action.notifications.page
      };
    case notificationConstants.GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case notificationConstants.SET_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state
  }
}