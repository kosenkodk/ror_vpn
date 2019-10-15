
import { ticketConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './'

export const ticketActions = {
  getAll,
  add,
}

function getAll() {
  return dispatch => {
    dispatch(request())

    userService.getTickets()
      .then(
        tickets => dispatch(success(tickets)),
        error => {
          dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  function request() { return { type: ticketConstants.GETALL_REQUEST } }
  function success(tickets) { return { type: ticketConstants.GETALL_SUCCESS, tickets } }
  function failure(error) { return { type: ticketConstants.GETALL_FAILURE, error } }
}

function add(item) {
  return dispatch => {
    dispatch(request({ item }))
    userService.addTicket(item)
      .then(
        notice => dispatch(alertActions.notice(notice)),
        error => dispatch(alertActions.error(error))
      )
  }
  function request() { return { type: ticketConstants.ADD_REQUEST } }
  // function success(tickets) { return { type: ticketConstants.ADD_SUCCESS, tickets } }
  // function failure(error) { return { type: ticketConstants.ADD_FAILURE, error } }
}