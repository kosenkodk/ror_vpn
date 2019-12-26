import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { NewLineToBr, ModalPopup } from '../_components'
import icPdf from 'images/icons/ic_pdf3'
import { AttachmentPdf, AttachmentImage } from './admin'

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
        <h6 className="mb-n2">
          <b>{this.getUserNameOrEmailFromMessage(item)}</b>
        </h6>
        <p><small className="ticket__message_datetime">Ticket created on {item && item.created_at_humanize}</small></p>

        <div className="border border-radius border-gray p-3">
          {(item && item.text) ? <NewLineToBr>{item.text}</NewLineToBr> : '-'}

          {/* single attachment */}
          {/* {item && item.attachment_url &&
            <div className="form-group row">
              <label htmlFor="ticketAttachment" className="col-sm-4">{I18n.t('pages.tickets.form.attachment')}:</label>
              <div className="col-sm-8">
                <a className="" href={item.attachment_url}>{item.attachment_name && item.attachment_name}</a>
              </div>
            </div>
          } */}

          {/* multiple attachments */}
          {/* {item && item.attachmentList &&
            <div className="">
              <h6 className="mt-2">{I18n.t('pages.tickets.form.attachments')}:</h6>
              {item.attachmentList.map((item, index) =>
                <React.Fragment>
                  {(item.content_type === 'application/pdf') ?
                    <a className="p-1 col-sm-4 col-md-3 col-lg-2 img-thumbnail" href={item.url}>{item.name}</a>
                    :
                    <img className="p-1 col-sm-4 col-md-3 col-lg-2 img-thumbnail img-fluid" src={item.url} alt={item.content_type} />
                  }
                </React.Fragment>
              )}
            </div>
          } */}

          {/* multiple attachments as card group (with filename and link) */}
          {item && item.attachmentList &&
            <React.Fragment>
              <h6 className="mt-2">{I18n.t('pages.tickets.form.attachments')}:</h6>
              <div class="card-group row">
                {item.attachmentList.map((item, index) =>
                  <div className="col-sm-4 col-md-3 col-lg-2">
                    {(item.content_type === 'application/pdf') ?
                      <AttachmentPdf name={item.name} url={item.url} index={index} />
                      :
                      <AttachmentImage name={item.name} url={item.url} index={index} />
                    }
                  </div>
                )}
              </div>
            </React.Fragment>
          }

        </div>
      </React.Fragment>
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
