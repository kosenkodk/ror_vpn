import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { urls } from 'config';
import { history } from '../_helpers';
import PropTypes from 'prop-types';
import logoImage from 'images/logo.svg';

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
          <ul className="mt-sm-5 p-0 col sidebar accordion_menu list-group">
            {items ? items.map((item, index) =>
              <div key={item.path}>
                {item.urls ?
                  <React.Fragment>
                    <div className="collapsed" data-toggle="collapse" href={`#collapse${index}`}>
                      <li className="accordion_menu-title list-group-item">{item.name}</li>
                    </div>
                    <div id={`collapse${index}`} className="collapse" data-parent="#adminNavbar">
                      <ul className="submenu">
                        {item.urls && Object.values(item.urls).map(subItem =>
                          <li key={subItem.path}>
                            <Link smooth className="" activeClassName="" to={subItem.path}
                              location={{ pathname: document.location.pathname + document.location.hash }}>
                              {subItem.name}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </React.Fragment>
                  :
                  <Link key={item.path} smooth to={item.path} className="" activeClassName=""
                    location={{ pathname: document.location.pathname + document.location.hash }}>
                    <li className="list-group-item">{item.name}</li>
                  </Link>
                }
              </div>
            )
              : <li className="list-group-item">no items</li>
            }
          </ul>
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