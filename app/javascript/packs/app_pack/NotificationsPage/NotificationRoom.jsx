import React from 'react'
import { connect } from 'react-redux'
import { globalActions } from '../_actions'
import { Notifications } from '../NotificationsPage/Notifications'

class NotificationRoom extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      notifications: [],
    }
    this.notificationChannel = ''
  }

  onCreateNotification = (e, item) => {
    e.preventDefault()
    this.props.notifier && this.props.notifier.reply({ user_id: item.user_id, title: item.title })
  }

  componentDidMount() {

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    // if (nextProps.notifications.length > this.props.limit)
    // this.setState({ notifications: this.props.notifications })
  }

  render() {
    // const notifications = this.state.notifications
    const { user, notifications } = this.props
    return (
      <React.Fragment>
        <Notifications notifications={notifications} />
        <button className="btn btn-pink" onClick={(e) => this.onCreateNotification(e, { title: 'Notification', user_id: user.id })} />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { notifier } = state.global
  const { user } = state.authentication
  return {
    user,
    notifier
  }
}

const connectedComponent = connect(mapStateToProps)(NotificationRoom)
export { connectedComponent as NotificationRoom }