import React from 'react'
import { Sidebar } from '../_components'
import { Alert } from '../_components'

const AdminLayout = (props) => (
  <div className='container-fluid bg1'>

    <div className='container-fluid'>
      <Header />
    </div>

    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <Alert />
        </div>
      </div>
    </div>

    <section className='container-fluid'>
      {props.children}
    </section>
  </div>

)

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

export { Layout, LayoutWithSidebar, AdminLayout }
