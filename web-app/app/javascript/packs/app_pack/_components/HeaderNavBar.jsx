import React from 'react';
import logoImage from 'images/logo.svg';
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
      <nav id="navbar" className="nav navbar navbar-expand-md navbar-dark fixed-top">
        <div className="container">
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
                  {[
                    // urls.help, urls.user_dashboard, urls.user_account, urls.tickets,
                    // urls.user_payment, urls.user_downloads, urls.user_invite_friend,
                    urls.user_dashboard, urls.features, urls.pricing, urls.downloads, urls.contact_us, urls.help,
                  ].map((item, index) =>
                    <li key={`nav-private${index}`} className="nav-item px-1">
                      <NavHashLink smooth to={item.path} activeClassName="" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{item.name}</NavHashLink>
                    </li>
                  )}
                  <li className="nav-item px-1">
                    <NavHashLink to={urls.signout.path} onClick={this.signOut} activeClassName="" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink active">{urls.signout.name}</NavHashLink>
                  </li>
                </ul>
                :
                <ul className="navbar-nav ml-auto">
                  {[
                    urls.features, urls.pricing, urls.downloads, urls.contact_us, urls.help, urls.signin, urls.signup
                  ].map((item, index) =>
                    <li key={`nav-pubic${index}`} className="nav-item px-1">
                      <NavHashLink smooth to={item.path} activeClassName="" className={`nav-link pl-3 pr-3 text-left btn btn-outline-pink ${item.className || ''}`}>{item.name}</NavHashLink>
                    </li>
                  )}
                </ul>
            }
          </div>
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