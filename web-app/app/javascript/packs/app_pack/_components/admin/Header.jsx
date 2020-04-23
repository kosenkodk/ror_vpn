import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { connect } from 'react-redux';
import { notificationActions, userActions } from '../../_actions';
import { urls } from 'config';
import notificationSrc from 'images/admin/notification.svg';
import notificationNewSrc from 'images/admin/notification_new.svg';
import { NotificationPopup } from './NotificationPopup';

class Header extends React.Component {

  signOut = (e) => {
    this.props.dispatch(userActions.logout());
    e.preventDefault();
  }

  openNotifications = (e) => {
    e.preventDefault();
    this.props.dispatch(notificationActions.isOpen(!this.props.isOpen));
    if (!this.props.is_read_all)
      this.props.dispatch(notificationActions.readAll());
  }

  render() {
    const { user, title, is_read_all, isOpen, notifications } = this.props;
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
        <NotificationPopup notifications={(notifications && (notifications.length > 0)) && notifications.filter((item, index) => index < 5)} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.page;
  const { notifications, is_read_all, isOpen } = state.notifications;
  const { user } = state.authentication;
  return {
    is_read_all, isOpen, notifications,
    user, title
  };
}

const connectedPage = connect(mapStateToProps)(Header);
export { connectedPage as Header };
