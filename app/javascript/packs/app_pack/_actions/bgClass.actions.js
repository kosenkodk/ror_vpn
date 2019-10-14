import { bgClassConstants } from '../_constants';

export const bgClassActions = {
  set,
  clear
};

function set(value) {
  return { type: bgClassConstants.SET, value };
}
function clear() {
  return { type: bgClassConstants.CLEAR };
}
