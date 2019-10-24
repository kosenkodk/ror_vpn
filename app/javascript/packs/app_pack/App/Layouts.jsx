import React from 'react';
import Sidebar from '../_components/Sidebar';

const Layout = (props) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
)

const LayoutWithSidebar = (props) => (
  <div className="row">
    <div className="col-sm-3 col-md-4">
      <Sidebar />
    </div>
    <div className="col-sm-9 col-md-8">
      {props.children}
    </div>
  </div>
)

const LayoutWith2Sidebars = (props) => (
  <div className="row">
    <div className="col-sm-2">
      <Sidebar />
    </div>
    <div className="col-sm-8">
      {props.children}
    </div>
    <div className="col-sm-2">
      <Sidebar />
    </div>
  </div>
)

export { Layout, LayoutWithSidebar, LayoutWith2Sidebars }
