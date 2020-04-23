import { bgClassConstants } from '../_constants';

export const bgClassActions = {
  set,
  clear
};

function set(key, value) {
  return {
    type: bgClassConstants.SET, item: { key: key, value: value }
  };
}
function clear() {
  return { type: bgClassConstants.CLEAR };
}
