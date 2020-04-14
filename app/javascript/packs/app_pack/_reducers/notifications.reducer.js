import { notificationConstants } from '../_constants';

export function notifications(state = {}, action) {
  switch (action.type) {
    case notificationConstants.CREATE_NOTIFIER:
      return {
        ...state,
        notifier: action.notifier
      };
    case notificationConstants.READ_ALL_REQUEST:
      return {
        ...state,
      };
    case notificationConstants.READ_ALL_SUCCESS:
      return {
        ...state,
        is_read_all: action.response.is_read_all,
        // notifications: action.response.notifications,
        notifications: state.notifications && state.notifications.map(item => {
          item.is_read = true
          return item
        })
      };
    case notificationConstants.READ_ALL_FAILURE:
      return {
        ...state,
        error: action.error
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
        page: action.notifications.page,
        is_read_all: action.notifications.is_read_all,
      };
    case notificationConstants.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.notifications.notifications,
        pages: action.notifications.pages,
        page: action.notifications.page,
        is_read_all: action.notifications.is_read_all,
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