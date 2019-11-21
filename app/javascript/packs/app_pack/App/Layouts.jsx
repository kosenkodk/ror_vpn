import React from 'react';
import { history } from '../_helpers';
import { urls } from 'config';
import { connect } from 'react-redux';
import { FooterSection } from '../_sections';
import { Sidebar, Alert, Header } from '../_components';
import { Header as HeaderAdmin } from '../_components/admin';
// import imgHeaderSrc from 'images/compare/header_with_first_section.png';
// import imgFooterSrc from 'images/compare/footer.png';

const AdminLayout = (props) => (
  <div id='admin_layout' className='container-fluid '>
    <div className='row'>
      <div className='d-flex flex-column col-md-2 background-black'>
        <div className='flex-grow-1'>
          <Sidebar />
        </div>
        <div className='align-self-center mb-2'>© {new Date(Date.now()).getFullYear()} Vega VPN</div>
      </div>
      <div style={{ minHeight: '100vh' }} className='col-md-10 background-pink d-flex flex-column align-items-stretch'>
        <div className='flex-grow-1'>
          <HeaderAdmin />
          <Alert />
          <div className='col bg-lite pt-3 mb-5' style={{ minHeight: '85vh' }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const GuestLayout = (props) => (
  <div id='guest' className={` d-flex flex-column ${props.bgClass.bg_stars && props.bgClass.bg_stars.value}`} style={{ minHeight: '100vh' }}>
    {/* <div className="container"><div className="row"><img src={imgHeaderSrc} className="col align-self-center img-fluid" /></div></div> */}

    <div className={`container-fluid flex-grow-1 ${props.bgClass.bg1 && props.bgClass.bg1.value}`}>

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
    {/* <div className="row"><img src={imgFooterSrc} className="col align-self-center img-fluid" /></div> */}
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

