import React from 'react'
import { NavHashLink } from 'react-router-hash-link'

import { connect } from 'react-redux'
import { notificationActions, userActions } from '../../_actions'
import { urls } from 'config'
import { Link } from 'react-router-dom'
import notificationSrc from 'images/admin/notification.svg'
import notificationNewSrc from 'images/admin/notification_new.svg'
import { history } from '../../_helpers'
import { Notifications } from '../../NotificationsPage/Notifications'

class NotificationPopup extends React.Component {

  signOut = (e) => {
    this.props.dispatch(userActions.logout())
    e.preventDefault()
  }

  openNotifications = (e) => {
    e.preventDefault();
    if (!this.props.is_read_all)
      this.props.dispatch(notificationActions.readAll())
    this.props.dispatch(notificationActions.isOpen(!this.props.isOpen))
  }

  closeNotifications = (e) => {
    e.preventDefault();
    this.props.dispatch(notificationActions.isOpen(false))
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
    const { loggedIn, user, title, notifications, is_read_all, isOpen } = this.props;
    return (
      <div className="notifications-wrapper">
        <div className={`notifications ${isOpen ? 'd-block' : 'd-none'}`}>
          <div className="row notifications-header">
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.page
  const { notifications, is_read_all, isOpen } = state.notifications
  const { loggedIn, user } = state.authentication;
  return {
    notifications, is_read_all, isOpen,
    loggedIn, user, title
  }
}

const connectedPage = connect(mapStateToProps)(NotificationPopup)
export { connectedPage as NotificationPopup }
