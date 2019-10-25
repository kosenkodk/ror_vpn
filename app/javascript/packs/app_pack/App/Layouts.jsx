import React from 'react'
import Sidebar from '../_components/Sidebar';

const Layout = (props) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
)

const LayoutWithSidebar = (props) => (
  <div className="row">
    <div className="col-md-3 col-lg-2 d-none d-md-block">
      <Sidebar />
    </div>
    <div className="col-md-9 col-lg-10">
      {props.children}
    </div>
  </div>
)

export { Layout, LayoutWithSidebar }
