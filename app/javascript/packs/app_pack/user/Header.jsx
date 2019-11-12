import React from 'react'
import { connect } from 'react-redux';
import { NavHashLink } from 'react-router-hash-link'

import { userActions } from '../_actions';
import { urls } from 'config';

import logoImage from 'images/logo.png'


class Header extends React.Component {

  signOut = (e) => {
    this.props.dispatch(userActions.logout());
    e.preventDefault();
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <nav className="nav navbar navbar-expand-md navbar-dark bg-transparent">
        <NavHashLink smooth to={urls.home.path}>
          <img src={logoImage} className='navbar-brand mr-auto ml-2' alt='Vega VPN'></img>
        </NavHashLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar6">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collapse justify-content-stretch" id="navbar6">
          {loggedIn &&
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavHashLink to={urls.signout.path} onClick={this.signOut} activeClassName="" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink active">{urls.signout.name}</NavHashLink>
              </li>
            </ul>
          }
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const connectedPage = connect(mapStateToProps)(Header);
export { connectedPage as Header }; 