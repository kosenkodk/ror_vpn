import React from 'react'
import { connect } from 'react-redux'
import consumer from 'channels/consumer'
import { globalActions } from '../_actions'

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
    this.notificationChannel.reply({ user_id: item.user_id, title: item.title })
  }

  componentDidMount() {
    const user_id = this.props.user.id

    this.notificationChannel = consumer.subscriptions.create(
      {
        channel: 'NotificationsChannel',
        room: `Room${user_id}`
      },
      {
        received: data => {
          switch (data.type) {
            case 'message':
              const notifications = [data.message, ...this.state.notifications]
              this.setState({ notifications: notifications })
              this.props.dispatch(globalActions.addNotification(this.props.limit))
              break
            case 'messages':
              this.setState({ notifications: data.messages })
              break
          }
        },
        reply: function (data) {
          return this.perform("reply", data)
        },
        load: function () {
          return this.perform("load", { user_id: user_id })
        },
      }
    );
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
        <table className="table text-left">
          <tbody>
            {notifications && notifications.map((item, index) =>
              <tr key={`notification${index}`}>
                <td className="text-left">
                  {item.title || item.text}
                </td>
                <td className="text-right notifications-item-date">
                  {item.created_at_humanize}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="btn btn-pink" onClick={(e) => this.onCreateNotification(e, { title: 'Notification', user_id: user.id })} />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  // const { notifications } = state.global
  const { user } = state.authentication
  return {
    user,
    // notifications
  }
}

const connectedComponent = connect(mapStateToProps)(NotificationRoom)
export { connectedComponent as NotificationRoom }
