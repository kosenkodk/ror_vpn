import React from 'react';
import { history } from '../_helpers';
import { urls } from 'config';
import { connect } from 'react-redux';
import { FooterSection } from '../_sections';
import { Sidebar, Alert, Header } from '../_components';
import { Header as HeaderAdmin } from '../_components/admin';

const AdminLayout = (props) => (
  <div id="admin_layout" className='container-fluid '>
    <div className='row'>
      <div className='col-md-2 background-black'>
        <Sidebar />
      </div>
      <div style={{ minHeight: '100vh' }} className='col-md-10 background-pink d-flex flex-column align-items-stretch'>
        <div className='flex-grow-1'>
          <HeaderAdmin />
          <Alert />
          <div className="col bg-lite p-4 mb-5">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GuestLayout = (props) => (
  <div className={`d-flex flex-column bg_stars`} style={{ minHeight: '100vh' }}>

    <div className={`container-fluid flex-grow-1 ${props.bgClass.value}`}>
      <div className={`${props.loggedIn ? 'container-fluid' : 'container'}`}>
        <Header />
      </div>

      <div className={`${props.loggedIn ? 'container-fluid' : 'container'}`}>
        <div className="row">
          <div className="col">
            <Alert />
          </div>
        </div>
      </div>

      <section className={`${history.location.pathname === urls.home.path ? '' : `${props.loggedIn ? 'container-fluid' : 'container'}`}`}>
        {props.children}
      </section>
    </div>
    {props.isFooterVisible && <FooterSection />}
  </div>
);

const Layout = (props) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
);

const LayoutWithSidebar = (props) => (
  <div className="row">
    <div className="col-md-3 col-lg-2 d-none d-md-block">
      <Sidebar />
    </div>
    <div className="col-md-9 col-lg-10">
      {props.children}
    </div>
  </div>
);

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  const { alert, bgClass } = state;
  return {
    alert, bgClass, loggedIn
  };
}

const connectedLayout = connect(mapStateToProps)(GuestLayout);
export { Layout, LayoutWithSidebar, AdminLayout, connectedLayout as GuestLayout };

