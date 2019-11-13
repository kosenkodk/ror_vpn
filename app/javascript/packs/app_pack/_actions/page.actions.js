import { pageConstants } from '../_constants';

export const pageActions = {
  setTitle,
  clear
};

function setTitle(title) {
  return { type: pageConstants.SET_TITLE, title };
}
function clear() {
  return { type: bgClassConstants.CLEAR };
}
