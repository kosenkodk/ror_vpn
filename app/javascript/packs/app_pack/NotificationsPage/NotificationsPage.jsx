import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { globalActions } from '../_actions'

class NotificationsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(globalActions.getNotifications(5))
  }

  render() {
    const { notifications } = this.props
    return (
      <div className="container-fluid notifications-page">
        <h1>Notifications</h1>
        <div className="row">
          <div className="col-8">
            {notifications && notifications.map((item, index) => <div key={`message${index}`} className="row">
              <div className="col-8">
                {item.title || item.text}
              </div>
              <div className="col text-right notifications-page__item-date">
                {item.created_at_humanize}
              </div>
            </div>)}
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