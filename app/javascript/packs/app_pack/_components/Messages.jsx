import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'

class Messages extends React.Component {

  getUserNameOrEmailFromMessage(message) {
    let name = ''
    try {
      const current_user = this.props.user
      const user = message.user
      name = current_user.id === user.id ? 'You' : user.email
      // name = current_user.email === user.email ? 'You' : user.email
    } catch (e) { }
    return name
  }

  render() {
    const { items, user } = this.props
    // const { items } = this.state
    const messageList = items && items.map((item, index) =>
      <div key={`msg${item.id}_${index}`} className="ticket_message">
        <div className="form-group row">
          <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">
            From:
          </label>
          <div className="col-sm-8 align-self-center">
            {this.getUserNameOrEmailFromMessage(item)} at {item.created_at}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">
            Message:
          </label>
          <div className="col-sm-8 align-self-center">
            {item.text}
          </div>
        </div>

        {item && item.attachment_url &&
          <div className="form-group row">
            <label htmlFor="ticketAttachment" className="col-sm-4">{I18n.t('pages.tickets.form.attachment')}:</label>
            <div className="col-sm-8">
              <a href={item.attachment_url}>{item.attachment_name && item.attachment_name}</a>
            </div>
          </div>
        }
      </div>
    )
    const emptyList = <p>no previous messages found</p>

    return (
      <React.Fragment>
        {/* <h3>Messages</h3> */}
        {items && items.length > 0 ? messageList : emptyList}
      </React.Fragment>
    )
  }
}


function mapStateToProps(state) {
  const { user } = state.authentication
  const { loading } = state.tickets
  return {
    user,
    loading
  }
}

const connectedForm = connect(mapStateToProps)(Messages)
export { connectedForm as Messages }