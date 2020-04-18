import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { connect } from 'react-redux';
import { notificationActions, userActions } from '../../_actions';
import { urls } from 'config';
import { Link } from 'react-router-dom';
import notificationSrc from 'images/admin/notification.svg';
import notificationNewSrc from 'images/admin/notification_new.svg';
import { Notifications } from '../../NotificationsPage/Notifications';
import { history } from '../../_helpers';

class NotificationPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpenNotifications: true }
  }

  openNotifications = (e) => {
    e.preventDefault();
    if (!this.props.is_read_all)
      this.props.dispatch(notificationActions.readAll())
    this.setState({ isOpenNotifications: !this.state.isOpenNotifications });
  }

  closeNotifications = (e) => {
    e.preventDefault();
    this.setState({ isOpenNotifications: false });
  }

  viewAllNotifications = (e) => {
    e.preventDefault()
    history.push(urls.notifications.path)
    this.closeNotifications(e)
  }

  componentDidMount() {
    this.props.dispatch(notificationActions.getNotifications('per_page=5'))
  }

  render() {
    const { notifications, is_read_all } = this.props;
    return (
      <React.Fragment>
        {/* <NavHashLink to="#" activeClassName="" className="nav-link">
          <img id="notification_popup" onClick={this.openNotifications}
            src={is_read_all ? notificationSrc : notificationNewSrc}
            className="img-fluid" alt="User's Notification" />
        </NavHashLink> */}
        <div className={`notifications ${this.state.isOpenNotifications ? 'd-block' : 'd-none'}`}>
          <div className="notifications-arrow"></div>
          <div className="row notifications-NotificationPopup">
            <h6 className="col text-left">Notifications</h6>
            <div className="col text-right">
              <h6 onClick={this.closeNotifications} className="notifications-close">x</h6>
            </div>
          </div>
          <div className="notifications-body">
            <Notifications notifications={(notifications && (notifications.length > 0)) && notifications.filter((item, index) => index < 5)} />
          </div>
          <button id="btn-view-all-notifications" onClick={this.viewAllNotifications} className="btn btn-pink btn-block">See all incoming activities</button>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { notifications, is_read_all } = state.notifications;
  return {
    notifications, is_read_all
  };
}

const connectedPage = connect(mapStateToProps)(NotificationPopup);
export { connectedPage as NotificationPopup };
