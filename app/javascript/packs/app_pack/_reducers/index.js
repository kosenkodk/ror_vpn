import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { tickets } from './tickets.reducer'
import { departments } from './department.reducer'
import { alert } from './alert.reducer';
import { bgClass } from './bgClass.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  tickets,
  departments,
  alert,
  bgClass,
});

export default rootReducer;