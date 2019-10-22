import React from 'react'
import Sidebar from '../_components/Sidebar';

const Layout = (props) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
)

const LayoutWithSidebar = (props) => (
  <div className="row">
    <div className="col-sm-4">
      <Sidebar />
    </div>
    <div className="col-sm-8">
      {props.children}
    </div>
  </div>
)

export { Layout, LayoutWithSidebar }
