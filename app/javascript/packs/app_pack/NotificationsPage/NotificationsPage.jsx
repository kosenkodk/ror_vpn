import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'

class NotificationsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.dispatch(userActions.getUser())
  }

  render() {
    const { user } = this.props
    return (
      <div className="container-fluid notifications-page">
        <h1>Notifications</h1>
        <div className="row">
          <div className="col-8">
            {user.messages && user.messages.map(message => <div className="row">
              <div className="col-8">
                {message.title}
              </div>
              <div className="col text-right notifications-page__item-date">
                {message.created_at_humanize}
              </div>
            </div>)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication
  return {
    user
  }
}

const connectedPage = connect(mapStateToProps)(NotificationsPage)
export { connectedPage as NotificationsPage }