import React from 'react';
import { history } from '../_helpers';
import { urls } from 'config';
import { connect } from 'react-redux';
import { FooterSection } from '../_sections';
import { Sidebar, Alert, Header } from '../_components';
import { Header as HeaderAdmin, AccordionMenuVertical } from '../_components/admin';
// import imgHeaderSrc from 'images/compare/header_with_first_section.png';
// import imgFooterSrc from 'images/compare/footer.png';
// import tickets from 'images/compare/admin/tickets';
// import homeNoRewiewsSrc from 'images/compare/home_no_reviews'
// import homePageSrc from 'images/compare/home_page'
// import imgAppDownloadsSrc from 'images/compare/app_downloads'
// import FooterAccordion from '../_components/FooterAccordion';

const AdminLayout = (props) => (
  <div id='admin_layout' className='container-fluid shadow-vega position-sticky'>
    <div className='row'>

      {/* <img src={tickets} className='img-fluid' /> */}

      <aside className='col-sm-4 col-md-3 col-lg-2 background-black'>
        <div className='row d-flex flex-column'>
          <div classname='col'>
            <AccordionMenuVertical />
            <Sidebar />
          </div>
          {/* <FooterAccordion /> */}
        </div>
        <footer className='align-self-center mt-auto d-none d-md-block'>© {new Date(Date.now()).getFullYear()} Vega VPN</footer>
      </aside>
      <section className='col-md-10 background-pink d-flex flex-column align-items-stretch'>
        <div className='flex-grow-1'>
          <HeaderAdmin />
          <Alert />
          <article className='col bg-lite pt-3 mb-5'>
            {props.children}
          </article>
        </div>
      </section>
    </div>
  </div>
);

const GuestLayout = (props) => (
  <div id='guest' className={` d-flex flex-column ${props.bgClass.bg_stars && props.bgClass.bg_stars.value}`} style={{ minHeight: '100vh' }}>
    {/* <div className="container"><div className="row"><img src={imgHeaderSrc} className="col align-self-center img-fluid" /></div></div> */}
    {/* <div className="container"><div className="row"><img src={homeNoRewiewsSrc} className="col align-self-center img-fluid" /></div></div> */}
    {/* <div className="container-fluid"><div className="row"><img src={homePageSrc} className="row align-self-center img-fluid" /></div></div> */}

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

    {/* <div className="row">
      <img src={imgAppDownloadsSrc} className="col img-fluid" />
    </div> */}
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

