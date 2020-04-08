
import { ticketConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './'
import { history } from '../_helpers';
import { urls } from 'config';

export const ticketActions = {
  getAll,
  add,
  view,
  update,
  filterBy,
}

function getAll(page) {
  return dispatch => {
    dispatch(request())

    userService.getTickets(page)
      .then(
        tickets => dispatch(success(tickets)),
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: ticketConstants.GETALL_REQUEST } }
  function success(tickets) {
    localStorage.setItem('tickets', JSON.stringify(tickets))
    return { type: ticketConstants.GETALL_SUCCESS, tickets }
  }
  function failure(error) { return { type: ticketConstants.GETALL_FAILURE, error } }
}

function add(item) {
  return dispatch => {
    dispatch(request({ item }))
    userService.addTicket(item)
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
  function request() { return { type: ticketConstants.ADD_REQUEST } }
  function success(item) {
    history.push(urls.tickets.path + '/' + item.id)
    return { type: ticketConstants.ADD_SUCCESS, item }
  }
  function failure(error) { return { type: ticketConstants.ADD_FAILURE, error } }
}

function update(item) {
  return dispatch => {
    dispatch(request({ item }))
    userService.updateTicket(item)
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
  function request() { return { type: ticketConstants.UPDATE_REQUEST } }
  function success(item) {
    history.push(urls.tickets.path)
    return { type: ticketConstants.UPDATE_SUCCESS, item }
  }
  function failure(error) { return { type: ticketConstants.UPDATE_FAILURE, error } }
}

function view(id) {
  return dispatch => {
    dispatch(request({ ticket: id }))
    userService.viewTicket(id)
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
  function request() { return { type: ticketConstants.VIEW_REQUEST } }
  function success(item) { return { type: ticketConstants.VIEW_SUCCESS, item } }
  function failure(error) { return { type: ticketConstants.VIEW_FAILURE, error } }
}

function filterBy({ status = "" } = {}) {
  return { type: ticketConstants.FILTER_BY, status }
}