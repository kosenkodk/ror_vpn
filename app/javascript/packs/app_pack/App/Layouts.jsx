import React from 'react';
import { history } from '../_helpers';
import { urls } from 'config';
import { connect } from 'react-redux';
import { FooterSection } from '../_sections';
import { Sidebar, Alert, Header } from '../_components';
import { AlertAutoHidden as AlertAdmin, Header as HeaderAdmin, AccordionMenuVertical } from '../_components/admin';


const AdminLayout = (props) => (
  <div id="admin_layout" className="container-fluid position-sticky">
    <div className='row'>

      <aside className="col-md-3 d-flex flex-column">
        <Sidebar />
        <footer className='d-none d-md-block mb-4 mt-auto align-self-center'>© {new Date(Date.now()).getFullYear()} Vega VPN</footer>
      </aside>

      <section className="col background-pink">
        <div className="d-flex flex-column h-100">
          <div className="header text-center w-100">
            <HeaderAdmin />
          </div>

          <div className="alert-wrapper">
            <AlertAdmin />
            {/* <div id='alert' className="text-center header__alert">
              <div className={`alert alert-danger alert-inline`}>alert message</div>
            </div> */}
          </div>

          <div className="flex-grow-1 main-content background-white">
            <article className="container-fluid">
              {props.children}
              {/* <p>{Array.from(new Array(1500)).map(item => "article ")}</p> */}
            </article>
          </div>
        </div>
      </section>
    </div>
  </div>
);


const AdminLayoutTwoScrolls = (props) => (
  <div id="admin_layout" className="container-fluid position-sticky">
    <div className='row'>

      <aside className="col-md-3 d-flex flex-column">
        <Sidebar />
        <footer className='d-none d-md-block mb-4 mt-auto align-self-center'>© {new Date(Date.now()).getFullYear()} Vega VPN</footer>
      </aside>

      <section className="col-md-9 col-lg background-pink">
        <div className="row">
          <div className="col header text-center w-100">
            <HeaderAdmin />
          </div>
        </div>

        <div className="container-fluid">

          <div className="row">
            <div className="col">
              <AlertAdmin />
              {/* <div id='alert' className="text-center header__alert">
              <div className={`alert alert-danger alert-inline`}>alert message</div>
            </div> */}
            </div>
          </div>

          <div className="row main-content background-white">
            <article className="col">
              {props.children}
              {/* <p>{Array.from(new Array(1500)).map(item => "article ")}</p> */}
            </article>
          </div>
        </div>
      </section>
    </div>
  </div>
);


const GuestLayout = (props) => (
  <div id='guest' className={` d-flex flex-column ${props.bgClass.bg_stars && props.bgClass.bg_stars.value}`} style={{ minHeight: '100vh' }}>
    <div className={`wrapper container-fluid flex-grow-1 ${props.bgClass.bg1 && props.bgClass.bg1.value}`}>

      <div className={`${props.loggedIn ? 'container' : 'container'}`}>
        <Header />
      </div>

      <div className={`${props.loggedIn ? 'container' : 'container'}`}>
        <div className="row">
          <div className="col">
            <Alert />
          </div>
        </div>
      </div>

      <section className={`${history.location.pathname === urls.home.path ? '' : `${props.loggedIn ? 'container' : 'container'}`}`}>
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

