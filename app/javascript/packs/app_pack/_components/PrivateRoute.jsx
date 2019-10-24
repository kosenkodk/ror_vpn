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

export const PrivateRouteWithRightSidebar = ({ sidebarUrls: arrayUrls, component: Component, ...rest }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-sm-10">
        <Route {...rest} render={props => (
          localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: config.urlAfterSignout, state: { from: props.location } }} />
        )} />
      </div>
      <div className="col-sm-2">
        <Sidebar items={arrayUrls} />
      </div>
    </div>
  </React.Fragment>
)

export const PrivateRouteWithSidebar = ({ sidebarUrls: arrayUrls, component: Component, ...rest }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-sm-2">
        <Sidebar items={arrayUrls} />
      </div>
      <div className="col-sm-10">
        <Route {...rest} render={props => (
          localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: config.urlAfterSignout, state: { from: props.location } }} />
        )} />
      </div>
    </div>
  </React.Fragment>
)