import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const middlewares = [thunkMiddleware];
const loggerMiddleware = createLogger();

if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

