
import { ticketConstants } from '../_constants';
import { userService } from '../_services';

export const ticketActions = {
  getAll,
}

function getAll() {
  return dispatch => {
    dispatch(request())

    userService.getTickets()
      .then(
        tickets => dispatch(success(tickets)),
        error => dispatch(failure(error))
      )
  }

  function request() { return { type: ticketConstants.GETALL_REQUEST } }
  function success(tickets) { return { type: ticketConstants.GETALL_SUCCESS, tickets } }
  function failure(error) { return { type: ticketConstants.GETALL_FAILURE, error } }
}