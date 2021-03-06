import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'

class Message extends React.Component {

  getUserNameOrEmailFromMessage(message) {
    let name = ''
    try {
      const current_user = this.props.user
      const user = message.user
      name = current_user.id === user.id ? 'You' : 'Vega VPN Support' // message.department.title
      // name = current_user.email === user.email ? 'You' : user.email
    } catch (e) { }
    return name
  }

  render() {
    const { item } = this.props

    return (
      <div className="card">
        <h5 className="card-header">
          From <b>{this.getUserNameOrEmailFromMessage(item)}</b> at {item && item.created_at_humanize}
          {/* {item.user && item.user.email} */}
        </h5>
        <div className="card-body">
          {/* <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a> */}

          {/* <div className="form-group row">
            <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">
              Date:
            </label>
            <div className="col-sm-8 align-self-center">
              {item && item.created_at_humanize}
            </div>
          </div> */}

          <div className="form-group row">
            <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">
              Message:</label>
            <div className="col-sm-8 align-self-center">
              {item && item.text}
            </div>
          </div>

          {item && item.attachment_url &&
            <div className="form-group row">
              <label htmlFor="ticketAttachment" className="col-sm-4">{I18n.t('pages.tickets.form.attachment')}:</label>
              <div className="col-sm-8">
                <a className="text-white" href={item.attachment_url}>{item.attachment_name && item.attachment_name}</a>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication
  return {
    user
  }
}

const connectedForm = connect(mapStateToProps)(Message)
export { connectedForm as Message }
