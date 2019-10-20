import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { config } from 'config';
import Sidebar from '../_components/Sidebar';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: config.urlAfterSignout, state: { from: props.location } }} />
  )} />
)

export const PrivateRouteWithSidebar = ({ component: Component, ...rest }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-sm-4">
        <Sidebar />
      </div>
      <div className="col-sm-8">
        <Route {...rest} render={props => (
          localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: config.urlAfterSignout, state: { from: props.location } }} />
        )} />
      </div>
    </div>
  </React.Fragment>
)