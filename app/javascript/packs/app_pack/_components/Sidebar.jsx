import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { urls } from 'config';
import { history } from '../_helpers';
import PropTypes from 'prop-types';
import logoImage from 'images/logo.svg';
import { NavHashLink } from 'react-router-hash-link';

class Sidebar extends React.Component {

  getNavLinkClass = (path) => {
    return history.location.pathname === path ? 'active' : '';
  }

  render() {
    let items = this.props.items;

    return (
      <nav id="adminNavbar" className="nav navbar navbar-expand-md navbar-dark bg-transparent justify-content-md-center">
        <div className="header">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarForAdminLeftSidebar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse justify-content-center" id="navbarForAdminLeftSidebar">
            <ul className="sidebar list-group">
              <NavHashLink smooth to={urls.home.path} className="border-secondary border-bottom ml-auto active">
                <img src={logoImage} className='navbar-brand' alt='Vega VPN'></img>
              </NavHashLink>

              {items ? items.map((item, index) =>
                <div key={item.path}>
                  {item.urls ?
                    <React.Fragment>
                      <div className="card-header collapsed" data-toggle="collapse" href={`#collapse${index}`}>
                        <li className="list-group-item">{item.name}</li>
                      </div>
                      <div id={`collapse${index}`} className="collapse" data-parent="#adminNavbar">
                        <ul className="list-unstyled p-3">
                          {item.urls && Object.values(item.urls).map(subItem =>
                            <li key={subItem.path}>
                              <NavHashLink smooth className="text-light" to={subItem.path}>{subItem.name}</NavHashLink>
                            </li>
                          )

                          }
                        </ul>
                      </div>
                    </React.Fragment>
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