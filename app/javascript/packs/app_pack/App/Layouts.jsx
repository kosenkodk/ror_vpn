import React from 'react'
import Sidebar from '../_components/Sidebar';

const Layout = (props) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
)

const LayoutWithSidebar = (props) => (
  <div className="row">
    <div className="col-sm-2">
      <Sidebar />
    </div>
    <div className="col-sm-10">
      {props.children}
    </div>
  </div>
)

export { Layout, LayoutWithSidebar }
