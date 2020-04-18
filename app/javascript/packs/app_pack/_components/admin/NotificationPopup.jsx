import React from 'react'
import { connect } from 'react-redux'
import { notificationActions, userActions } from '../../_actions'
import { urls } from 'config'
import { history } from '../../_helpers'
import { Notifications } from '../../NotificationsPage/Notifications'

class NotificationPopup extends React.Component {

  state = {
    clickedOutside: false
  }

  myRef = React.createRef()

  componentDidMount() {
    this.props.dispatch(notificationActions.getNotifications('per_page=5'))
    document.addEventListener("mousedown", this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside)
  }

  handleClickOutside = e => {
    if (e.target.closest('#notification_popup')) return;
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ clickedOutside: true })
      this.closeNotifications(e)
    }
  }

  handleClickInside = () => {
    this.setState({ clickedOutside: false })
  }

  signOut = (e) => {
    this.props.dispatch(userActions.logout())
    e.preventDefault()
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

  render() {
    const { loggedIn, user, title, notifications, is_read_all, isOpen } = this.props;
    return (
      <div ref={this.myRef} onClick={this.handleClickInside} className="notifications-wrapper">
        <div className={`notifications ${isOpen ? 'd-block' : 'd-none'}`}>
          <div className="row notifications-header">
            <h6 className="col text-left">Notifications</h6>
            <div className="col text-right">
              <h6 onClick={this.closeNotifications} className="notifications-close">x</h6>
            </div>
          </div>
          <div className="notifications-body">
            <Notifications notifications={notifications} />
          </div>
          <button id="btn-view-all-notifications" onClick={this.viewAllNotifications} className="btn btn-pink btn-block">See all incoming activities</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.page
  const { is_read_all, isOpen } = state.notifications
  const { loggedIn, user } = state.authentication;
  return {
    is_read_all, isOpen,
    loggedIn, user, title
  }
}

const connectedPage = connect(mapStateToProps)(NotificationPopup)
export { connectedPage as NotificationPopup }
