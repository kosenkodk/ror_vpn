import { pageConstants } from '../_constants';

export function page(state = {}, action) {
  switch (action.type) {
    case pageConstants.SET_TITLE:
      return {
        title: action.title
      };
    case pageConstants.CLEAR:
      return {
        title: ''
      };
    default:
      return state
  }
}