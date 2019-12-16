import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { urls } from 'config';
import { history } from '../_helpers';
import PropTypes from 'prop-types';
import logoImage from 'images/logo.svg';
import { MenuVertical } from './admin';

class Sidebar extends React.Component {

  getNavLinkClass = (path) => {
    return history.location.pathname === path ? 'active' : '';
  }

  render() {
    let items = this.props.items;

    return (
      <nav id="adminNavbar" className="d-flex flex-column navbar-expand-md navbar-dark bg-transparent">
        <div className="row mx-2">
          <div className="col text-sm-center">
            <Link smooth to={urls.home.path} className="navbar-brand">
              <img src={logoImage} className='' alt='Vega VPN'></img>
            </Link>
          </div>
          <div className="col-shrink align-self-center">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarForAdminLeftSidebar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <div className="p-0 border-secondary border-top navbar navbar-full navbar-collapse collapse" id="navbarForAdminLeftSidebar">
          <MenuVertical />
        </div>
      </nav>
    );
  }
}

Sidebar.defaultProps = {
  items: [
    urls.user_dashboard,
    urls.user_account,
    urls.tickets,
    urls.user_payment,
    urls.user_downloads,
    urls.user_invite_friend,
  ]
}

Sidebar.propTypes = {
  // items: PropTypes.array,
}

export default Sidebar;