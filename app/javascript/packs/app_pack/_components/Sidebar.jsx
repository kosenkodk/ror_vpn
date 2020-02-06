import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { urls } from 'config';
import { history } from '../_helpers';
import logoImage from 'images/logo.svg';
import icCloseSrc from 'images/admin/ic_close_white.svg';
import { MenuVertical } from '../_components/admin/MenuVertical';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHide: false
    };
    this.onMenuClose = this.onMenuClose.bind(this);
    this.onMenuOpen = this.onMenuOpen.bind(this);
  }

  getNavLinkClass = (path) => {
    return history.location.pathname === path ? 'active' : '';
  }

  onMenuClose(e) {
    this.setState({ isHide: true });
    document.body.classList.remove('no-scroll');
    e.preventDefault();
  }

  onMenuOpen(e) {
    this.setState({ isHide: false });
    document.getElementById('navbar-toggler').classList.contains('collapsed') ?
      document.body.classList.remove('no-scroll') :
      document.body.classList.add('no-scroll');
    e.preventDefault();
  }

  render() {
    return (
      <nav id="adminNavbar" className="d-flex flex-column navbar-expand-md navbar-dark bg-transparent">
        <div className="row mx-2 d-none d-md-block">
          <div className="col text-sm-center">
            <Link smooth to={urls.home.path} className="navbar-brand">
              <img src={logoImage} className='' alt='Vega VPN'></img>
            </Link>
          </div>
          <div className="col-shrink align-self-center">
            <button id="navbar-toggler" onClick={this.onMenuOpen} className={`navbar-toggler ${this.state.isHide && 'collapsed'}`} type="button" data-toggle="collapse" data-target="#navbarForAdminLeftSidebar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        {/* for mobiles */}
        <div className="d-block d-md-none flex-row d-flex align-items-center">
          <div className="mr-auto">
            <button id="navbar-toggler" onClick={this.onMenuOpen} className={`navbar-toggler ${this.state.isHide && 'collapsed'}`} type="button" data-toggle="collapse" data-target="#navbarForAdminLeftSidebar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="">
            <Link smooth to={urls.home.path} className="navbar-brand">
              <img src={logoImage} className='' alt='Vega VPN'></img>
            </Link>
          </div>
        </div>
        <div className={`p-0 border-secondary border-top navbar navbar-full navbar-collapse collapse ${this.state.isHide && 'hide'}`} id="navbarForAdminLeftSidebar">



          <MenuVertical onClick={this.onMenuClose} >
            <div className="mx-2 d-block d-md-none flex-row d-flex align-items-center">
              <div className="mr-auto">
                <Link smooth to={urls.home.path} className="navbar-brand">
                  <img src={logoImage} className='' alt='Vega VPN'></img>
                </Link>

              </div>
              <div className="">
                <button id="navbar-toggler" onClick={this.onMenuOpen} className={`navbar-toggler ${this.state.isHide && 'collapsed'}`} type="button" data-toggle="collapse" data-target="#navbarForAdminLeftSidebar">
                  {/* <span className="navbar-toggler-icon"></span> */}

                  <img src={icCloseSrc} className='' alt='Vega VPN'></img>

                </button>
              </div>
            </div>
          </MenuVertical>
        </div>
      </nav>
    );
  }
}

export default Sidebar;