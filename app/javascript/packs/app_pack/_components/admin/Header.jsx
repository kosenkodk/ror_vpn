import React from 'react';
import ReactDOM from 'react-dom';

import { NavHashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { urls } from 'config';

class Header extends React.Component {

  signOut = (e) => {
    this.props.dispatch(userActions.logout());
    e.preventDefault();
  }

  componentDidUpdate() {
    var n = ReactDOM.findDOMNode(this);
    console.log('header position', n.offsetTop, n.offsetBottom);
  }

  render() {
    const { loggedIn, user, title } = this.props;

    return (
      <nav className="nav justify-content-end d-flex align-items-center">
        <li className="nav-item mr-auto">
          <h1 className="p-0 m-0 mt-xl-2">{title}</h1>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white">{user && user.email}</a>
        </li>
        <li className="nav-item">
          <NavHashLink to={urls.user_account.path} activeClassName="" className="">
            <img src={urls.user_account.imgSrc} className="img-fluid" alt="User's Profile" />
          </NavHashLink>
        </li>
        <li className="nav-item">
          <NavHashLink to={urls.notifications.path} activeClassName="" className="nav-link">
            <img src={urls.notifications.imgSrc} className="img-fluid" alt="User's Notification" />
          </NavHashLink>
        </li>
        <li className="nav-item">
          <NavHashLink to={urls.signout.path} onClick={this.signOut} activeClassName="" className="nav-link btn btn-sm btn-black">{urls.signout.name}</NavHashLink>
        </li>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.page
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn, user, title
  };
}

const connectedPage = connect(mapStateToProps)(Header);
export { connectedPage as Header };
