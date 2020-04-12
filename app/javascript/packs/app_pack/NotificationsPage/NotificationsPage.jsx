import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { globalActions } from '../_actions'
import { NotificationRoom } from '../NotificationsPage/NotificationRoom'

class NotificationsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(globalActions.getNotifications(12))
  }

  render() {
    const { notifications } = this.props
    return (
      <div className="container-fluid notifications-page">
        <h1>Notifications</h1>
        <div className="row">
          <div className="col-md-8">
            <NotificationRoom notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { notifications } = state.global
  return {
    notifications
  }
}

const connectedPage = connect(mapStateToProps)(NotificationsPage)
export { connectedPage as NotificationsPage }