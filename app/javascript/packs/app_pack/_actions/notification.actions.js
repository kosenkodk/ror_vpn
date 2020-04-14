
import { userService } from '../_services';
import { alertActions } from './';
import { notificationConstants } from '../_constants';

export const notificationActions = {
  createNotifier,
  addNotification,
  getNotifications,
  setPage,
  readAll,
}

function readAll() {
  return dispatch => {
    dispatch(request())
    userService.readAllNotifications()
      .then(
        response => {
          dispatch(success(response))
        },
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() {
    return { type: notificationConstants.READ_ALL_REQUEST }
  }
  function success(response) {
    return { type: notificationConstants.READ_ALL_SUCCESS, response }
  }
  function failure(error) {
    return { type: notificationConstants.READ_ALL_FAILURE, error }
  }
}

function setPage(page) {
  return { type: notificationConstants.SET_PAGE, page }
}

function createNotifier(notifier) {
  return { type: notificationConstants.CREATE_NOTIFIER, notifier }
}

function addNotification(item) {
  return success(item)

  return dispatch => {
    dispatch(request())
    userService.addNotification(item)
      .then(
        response => {
          // localStorage.setItem('notifications', JSON.stringify(response.notification))
          dispatch(success(response.notification))
        },
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: notificationConstants.ADD_NOTIFICATION_REQUEST } }
  function success(notification) { return { type: notificationConstants.ADD_NOTIFICATION_SUCCESS, notification } }
  function failure(error) { return { type: notificationConstants.ADD_NOTIFICATION_FAILURE, error } }
}

function getNotifications(params) {
  return dispatch => {
    const notifications = request(JSON.parse(localStorage.getItem('notifications')))
    dispatch(request(notifications.notifications))
    userService.getNotifications(params)
      .then(
        response => {
          localStorage.setItem('notifications', JSON.stringify(response))
          dispatch(success(response))
        },
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request(notifications) {
    return { type: notificationConstants.GET_NOTIFICATIONS_REQUEST, notifications }
  }
  function success(notifications) {
    return { type: notificationConstants.GET_NOTIFICATIONS_SUCCESS, notifications }
  }
  function failure(error) {
    return { type: notificationConstants.GET_NOTIFICATIONS_FAILURE, error }
  }
}
