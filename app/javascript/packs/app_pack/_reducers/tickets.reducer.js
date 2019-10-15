import { ticketConstants } from '../_constants';

export function tickets(state = {}, action) {
  switch (action.type) {
    case ticketConstants.ADD_REQUEST:
      return {
        loading: true
      };
    case ticketConstants.ADD_SUCCESS:
      return {
        item: action.item
      };
    case ticketConstants.VIEW_REQUEST:
      return {
        loading: true
      };
    case ticketConstants.VIEW_SUCCESS:
      return {
        item: action.item
      };
    case ticketConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case ticketConstants.GETALL_SUCCESS:
      return {
        items: action.tickets
      };
    case ticketConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}