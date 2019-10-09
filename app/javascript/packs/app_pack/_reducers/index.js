import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { tickets } from './tickets.reducer'
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  tickets,
  alert
});

export default rootReducer;