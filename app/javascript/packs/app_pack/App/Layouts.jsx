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


const AdminLayout1420px = (props) => (
  <div id="admin_layout" className="container-fluid position-sticky">
    <div className="row d-flex vh-100">
      <div className="w-15 d-flex flex-column background-black">
        <div className="flex-fill">
          <Sidebar />
        </div>
        <div className="p-2 bd-highlight">footer</div>
      </div>
      <div className="flex-fill bd-highlight background-pink">
        <div className="p-2 bd-highlight">header</div>
        <div className="p-2 bd-highlight">alerts</div>
        <div className="mx-4 my-2 p-2 bd-highlight background-white h-75">content</div>

      </div>
    </div>

    <div className="d-flex bd-highlight mt-3 mb-3">
      <div className="w-25 p-2 bd-highlight">Flex item 1</div>
      <div className="w-0 p-2 bd-highlight">Flex item 2</div>
      <div className="w-75 p-2 bd-highlight">Flex item 3</div>
    </div>
    <div className="d-flex flex-column bd-highlight mb-3">
      <div className="p-2 bd-highlight">Flex item 1</div>
      <div className="p-2 bd-highlight">Flex item 2</div>
      <div className="p-2 bd-highlight">Flex item 3</div>
    </div>

    <div className="d-flex align-items-stretch mb-3">
      <div className="p-2 bd-highlight">Flex item 1</div>
      <div className="p-2 bd-highlight">Flex item 2</div>
      <div className="p-2 bd-highlight">Flex item 3</div>
    </div>

    <div className="d-flex flex-column align-items-stretch mb-3">
      <div className="p-2 bd-highlight">Flex item 1</div>
      <div className="p-2 bd-highlight">Flex item 2</div>
      <div className="p-2 bd-highlight">Flex item 3</div>
    </div>

    <div className="d-flex flex-row justify-content-between align-items-stretch mb-3 vh-100">
      <div className="p-2 bd-highlight align-self-start h-25">Flex item 1</div>
      <div className="p-2 bd-highlight align-self-center h-50">Flex item 2</div>
      <div className="p-2 bd-highlight align-self-end h-75">Flex item 3</div>
      <div className="p-2 bd-highlight align-self-end h-100">Flex item 4</div>
    </div>

    <div className="d-flex bd-highlight mb-3">
      <div className="p-2 flex-fill bd-highlight">Flex item with a lot of content</div>
      <div className="p-2 flex-fill bd-highlight">Flex item</div>
      <div className="p-2 flex-fill bd-highlight">Flex item</div>
    </div>

    <div className="d-flex flex-column bd-highlight mb-3 vh-100">
      <div className="p-2 flex-fill bd-highlight ">Flex fill item with a lot of content</div>
      <div className="p-2 bd-highlight">Flex fill item</div>
      <div className="p-2 flex-fill bd-highlight">Flex fill item</div>
    </div>

    <div className="d-flex bd-highlight mb-3">
      <div className="p-2 flex-grow-1 bd-highlight">flex-grow-1 item</div>
      <div className="p-2 bd-highlight">Flex item</div>
      <div className="p-2 bd-highlight">Third flex item</div>
    </div>

    <div className="d-flex flex-column flex-align-items-stretch vh-100 bd-highlight mb-3">
      <div className="p-2 flex-grow-1 bd-highlight">flex-grow-1 item</div>
      <div className="p-2 bd-highlight">Flex item</div>
      <div className="p-2 bd-highlight">Third flex item</div>
    </div>

    <div className="d-flex flex-wrap align-items-end align-items-lg-center" style={{ height: '300px' }}>
      <div className="col-4 bd-highlight" style={{ height: '100px' }}>1</div>
      <div className="col-4 bd-highlight" style={{ height: '150px' }}>2</div>
      <div className="col-4 bd-highlight" style={{ height: '75px' }}>3</div>
      <div className="col-4 bd-highlight" style={{ height: '150px' }}>4</div>
      <div className="col-4 bd-highlight" style={{ height: '100px' }}>5</div>
      <div className="col-4 bd-highlight" style={{ height: '75px' }}>6</div>
    </div>
  </div>
);

const AdminLayout = (props) => (
  <div id="admin_layout" className="container-fluid position-sticky">
    <div className='row'>

      <aside className="col-xl-2 col-lg-3 col-sm-4 border border-light
       d-flex flex-column">
        
        <Sidebar />
        <footer className='py-2 mt-auto align-self-center botder border-success'>© {new Date(Date.now()).getFullYear()} Vega VPN</footer>
      </aside>

      <section className="col border border-warning background-pink">
        <div className="header text-center">
          <HeaderAdmin />
        </div>
        <div id='alert' className="mt-n3 mb-n3 text-center">
          <div className={`m-0 alert alert-danger alert-inline`}>error error error error error</div>
        </div>
        <article className="border border-danger bg-lite">
          <div>
          {Array.from(new Array(500)).map(item => "article ")}
          </div>
        </article>
      </section>
    </div>
  </div>
);

const AdminLayout2 = (props) => (
  <div id='admin_layout' className='container-fluid shadow-vega position-sticky'>
    <div className='row'>

      {/* <img src={tickets} className='img-fluid' /> */}

      <aside className='d-flex flex-column align-items-stretch col-sm-4 col-md-3 col-lg-2 background-black'>
        <div className='row flex-grow-1 flex-column'>
          <div classname='col'>
            {/* <AccordionMenuVertical /> */}
            <Sidebar />
          </div>
          {/* <FooterAccordion /> */}
        </div>
        <div className='row'>
          <footer className='col self-align-end text-center pb-4 d-none d-sm-block'>© {new Date(Date.now()).getFullYear()} Vega VPN</footer>
        </div>
      </aside>
      <section className='col background-pink d-flex flex-column align-items-stretch'>
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

