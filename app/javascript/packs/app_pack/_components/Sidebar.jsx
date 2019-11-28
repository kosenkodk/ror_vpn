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
      <nav id="adminNavbar" className="d-flex flex-sm-column navbar-expand-sm navbar-dark bg-transparent justify-content-md-center">
        <Link smooth to={urls.home.path} className="navbar-brand">
          <img src={logoImage} className='' alt='Vega VPN'></img>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarForAdminLeftSidebar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="border-secondary border-top navbar navbar-full navbar-collapse collapse" id="navbarForAdminLeftSidebar">
          <ul className="col-12 sidebar accordion_menu list-group">
            {items ? items.map((item, index) =>
              <div key={item.path}>
                {item.urls ?
                  <div className="">
                    <div className="collapsed" data-toggle="collapse" href={`#collapse${index}`}>
                      <li className="accordion_menu-title list-group-item">{item.name}</li>
                    </div>
                    <div id={`collapse${index}`} className="collapse" data-parent="#adminNavbar">
                      <ul className="submenu">
                        {item.urls && Object.values(item.urls).map(subItem =>
                          <li key={subItem.path}>
                            <Link smooth className="text-light" activeClassName="active" to={subItem.path}
                              location={{ pathname: document.location.pathname + document.location.hash }}>
                              {subItem.name}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  :
                  <Link key={item.path} smooth to={item.path} activeClassName="active"
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