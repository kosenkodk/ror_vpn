import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { NewLineToBr } from '../_components'

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
      <React.Fragment>
        <h6 className="mb-0">
          <b>{this.getUserNameOrEmailFromMessage(item)}</b>
        </h6>
        <p><small className="ticket__message_datetime">Ticket created on {item && item.created_at_humanize}</small></p>


        <div className="border border-radius border-gray p-3">
          {(item && item.text) && <NewLineToBr>{item.text}</NewLineToBr>}

          {item && item.attachment_url &&
            <div className="form-group row">
              <label htmlFor="ticketAttachment" className="col-sm-4">{I18n.t('pages.tickets.form.attachment')}:</label>
              <div className="col-sm-8">
                <a className="" href={item.attachment_url}>{item.attachment_name && item.attachment_name}</a>
              </div>
            </div>
          }
        </div>
      </React.Fragment >
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
