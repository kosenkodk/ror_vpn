import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { config } from '../../../config';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }} />
  )} />
)