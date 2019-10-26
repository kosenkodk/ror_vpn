import { ticketConstants } from '../_constants';

export function tickets(state = {}, action) {
  switch (action.type) {
    case ticketConstants.ADD_REQUEST:
      return {
        // ...state,
        loading: true,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.ADD_SUCCESS:
      return {
        // ...state,
        item: action.item,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.ADD_FAILURE:
      return {
        // ...state,
        error: action.error,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.VIEW_REQUEST:
      return {
        // ...state,
        loading: true,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.VIEW_SUCCESS:
      return {
        // ...state,
        item: action.item,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.VIEW_FAILURE:
      return {
        // ...state,
        error: action.error,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.UPDATE_REQUEST:
      return {
        // ...state,
        loading: true,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.UPDATE_SUCCESS:
      return {
        // ...state,
        // item: action.item,
        items: state.items.map(itemPrev => itemPrev.id === action.item.id ? action.item : itemPrev),
        page: state.page,
        pages: state.pages,
        status: state.status,
      }
    case ticketConstants.UPDATE_FAILURE:
      return {
        // ...state,
        error: action.error,
        page: state.page,
        pages: state.pages,
        status: state.status,
      }
    case ticketConstants.GETALL_REQUEST:
      return {
        // ...state,
        loading: true,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.GETALL_SUCCESS:
      return {
        // ...state,
        items: action.tickets.tickets,
        page: action.tickets.page,
        pages: action.tickets.pages,
        status: state.status,
      };
    case ticketConstants.GETALL_FAILURE:
      return {
        // ...state,
        error: action.error,
        page: state.page,
        pages: state.pages,
        status: state.status,
      };
    case ticketConstants.FILTER_BY:
      return {
        // ...state,
        page: state.page,
        pages: state.pages,
        status: action.status,
      };
    default:
      return state
  }
}