import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { connect } from 'react-redux';
import { notificationActions, userActions } from '../../_actions';
import { urls } from 'config';
import { Link } from 'react-router-dom';
import notificationSrc from 'images/admin/notification.svg';
import notificationNewSrc from 'images/admin/notification_new.svg';
import { history } from '../../_helpers';
import { NotificationPopup } from './NotificationPopup';

class Header extends React.Component {

  signOut = (e) => {
    this.props.dispatch(userActions.logout());
    e.preventDefault();
  }

  openNotifications = (e) => {
    e.preventDefault();
    if (!this.props.is_read_all);
    this.props.dispatch(notificationActions.readAll());
    this.props.dispatch(notificationActions.isOpen(!this.props.isOpen));
  }

  render() {
    const { user, title, is_read_all, isOpen } = this.props;
    return (
      <React.Fragment>
        <nav className="nav justify-content-end d-flex align-items-center">
          <li className="nav-item mr-auto">
            <h1 className="p-0 m-0 mt-xl-2">{title}</h1>
          </li>
          <li className="nav-item d-none d-sm-block">
            <a id="emailInHeader" className="nav-link text-white">{user && user.email}</a>
          </li>
          <li className="nav-item">
            <NavHashLink to={urls.user_account.path} activeClassName="" className="">
              <img src={urls.user_account.imgSrc} className="img-fluid" alt="User's Profile" />
            </NavHashLink>
          </li>
          <li className="nav-item">
            <NavHashLink to="#" activeClassName="" className="nav-link">
              <img id="notification_popup" onClick={this.openNotifications}
                src={is_read_all ? notificationSrc : notificationNewSrc}
                className="img-fluid" alt="User's Notification" />
              {/* modal popup arrow */}
              <div className="notifications-wrapper">
                <div className={`notifications-arrow ${isOpen ? 'd-block' : 'd-none'}`}></div>
              </div>
            </NavHashLink>
          </li>
          <li className="nav-item">
            <NavHashLink to={urls.signout.path} onClick={this.signOut} activeClassName="" className="nav-link btn btn-sm btn-black">{urls.signout.name}</NavHashLink>
          </li>
        </nav>
        {/* modal popup content */}
        <NotificationPopup />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.page;
  const { is_read_all, isOpen } = state.notifications;
  const { user } = state.authentication;
  return {
    is_read_all, isOpen,
    user, title
  };
}

const connectedPage = connect(mapStateToProps)(Header);
export { connectedPage as Header };
