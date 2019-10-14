import { bgClassConstants } from '../_constants';

export function bgClass(state = {}, action) {
  switch (action.type) {
    case bgClassConstants.SET:
      return {
        value: action.value
      };
    case bgClassConstants.CLEAR:
      return {
        value: ''
      };
    default:
      return state
  }
}