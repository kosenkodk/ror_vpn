import { bgClassConstants } from '../_constants';

export function bgClass(state = {}, action) {
  switch (action.type) {
    case bgClassConstants.SET:
      return {
        ...state,
        [action.item.key]: action.item
      };
    case bgClassConstants.CLEAR:
      return {
      };
    default:
      return state
  }
}