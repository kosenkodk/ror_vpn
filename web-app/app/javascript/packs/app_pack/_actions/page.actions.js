import { pageConstants } from '../_constants';

export const pageActions = {
  setTitle,
  setSectionHeight,
  clear
};

function setSectionHeight(height) {
  return { type: pageConstants.SET_SECTION_HEIGHT, height };
}

function setTitle(title) {
  return { type: pageConstants.SET_TITLE, title };
}

function clear() {
  return { type: bgClassConstants.CLEAR };
}
