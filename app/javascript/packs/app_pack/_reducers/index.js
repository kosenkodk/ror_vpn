import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { tickets } from './tickets.reducer'
import { alert } from './alert.reducer';
import { bgClass } from './bgClass.reducer';
import { account } from './account.reducer';
import { page } from './page.reducer';
import { global } from './global.reducer';

const rootReducer = combineReducers({
  account,
  authentication,
  users,
  tickets,
  alert,
  bgClass,
  page,
  global
});

export default rootReducer;