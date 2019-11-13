import React from 'react';
import logoImage from 'images/logo.png';
import { NavHashLink } from 'react-router-hash-link';
import { urls } from 'config';

import { userActions } from '../_actions';
import { connect } from 'react-redux';

class HeaderNavBar extends React.Component {

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
          {
            loggedIn ?
              <ul className="navbar-nav ml-auto">
                {[urls.help, urls.user_dashboard, urls.user_account, urls.tickets,
                urls.user_payment, urls.user_downloads, urls.user_invite_friend
                ].map((item, index) =>
                  <li key={`nav-private${index}`} className="nav-item pr-1 pl-1">
                    <NavHashLink smooth to={item.path} activeClassName="" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{item.name}</NavHashLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavHashLink to={urls.signout.path} onClick={this.signOut} activeClassName="" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink active">{urls.signout.name}</NavHashLink>
                </li>
              </ul>
              :
              <ul className="navbar-nav ml-auto">
                {[urls.features, urls.pricing, urls.downloads, urls.contact_us, urls.help, urls.signin, urls.signup].map((item, index) =>
                  <li key={`nav-pubic${index}`} className="nav-item pr-1 pl-1">
                    <NavHashLink smooth to={item.path} activeClassName="" className={`nav-link pl-3 pr-3 text-left btn btn-outline-pink ${item.isActive ? 'active' : ''}`}>{item.name}</NavHashLink>
                  </li>
                )}
              </ul>
          }
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  const { loggingIn, loggedIn } = state.authentication;
  return {
    loggingIn,
    loggedIn,
  };
}

const connectedHeaderNavBarPage = connect(mapStateToProps)(HeaderNavBar);
export { connectedHeaderNavBarPage as HeaderNavBar }; 