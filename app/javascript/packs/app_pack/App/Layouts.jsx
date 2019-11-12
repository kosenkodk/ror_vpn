import React from 'react'
import Sidebar from '../_components/Sidebar';

const Layout = (props) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
)

const AdminLayout = (props) => (
  <div className="row">
    <div className="col-md-3 col-lg-2 d-none d-md-block">
      <Sidebar />
    </div>
    <div className="col-md-9 col-lg-10">
      {props.children}
    </div>
  </div>
)

const PublicLayout = (props) => (
  <body className="d-flex flex-column bg_star">
    <div className={`container-fluid flex-grow`}>
      <div className='container'>
        <Header />
      </div>

      <div className='container'>
        <div className="row">
          <div className="col">
            {/* {alert.message &&
                <div id="alert" className={`alert ${alert.type} text-center`}>{alert.message}</div>
              } */}
          </div>
        </div>
      </div>

      <section className='container-fluid'>
        {this.props.children}
      </section>
    </div>
    {/* {this.state.isFooterVisible && <FooterSection />} */}
  </body>
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

export { AdminLayout, PublicLayout, Layout, LayoutWithSidebar }
