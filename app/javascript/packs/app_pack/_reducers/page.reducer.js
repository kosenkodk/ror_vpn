import { pageConstants } from '../_constants';

export function page(state = {}, action) {
  switch (action.type) {
    case pageConstants.SET_TITLE:
      return {
        ...state,
        title: action.title
      };
    case pageConstants.CLEAR:
      return {
        ...state,
        title: ''
      };
    case pageConstants.SET_SECTION_HEIGHT:
      return {
        ...state,
        height: action.height
      };
    default:
      return state
  }
}