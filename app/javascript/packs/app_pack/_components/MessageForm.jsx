import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { ticketActions, globalActions } from '../_actions'
import { AttachmentPreview } from '../_components/admin'

class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      imagePreviews: []
    }
    this.onFilesChange = this.onFilesChange.bind(this)
  }

  onFilesChange(e) {
    e.preventDefault()

    if (e.target.files && e.target.files.length > 0) {
      // const imagePreviews = [...e.target.files].map((item, index) => {
      //   return { file: item, url: URL.createObjectURL(item) }
      // })
      // this.setState({ imagePreviews: imagePreviews })
      this.props.dispatch(globalActions.setAttachments(e.target.files))
      // this.props.onFilesChange(e, imagePreviews)
      return
    }
    // this.props.onFilesChange(e)
    // this.setState({ files: [], imagePreviews: [] })
    this.props.dispatch(globalActions.clearAttachments())
  }

  onTicketClose(e, id) {
    e.preventDefault()
    this.props.dispatch(ticketActions.update(id))
  }

  onMessageFormSubmit(e, props) {
    e.preventDefault()
    // this.setState({ files: [], imagePreviews: [] })
    // this.props.dispatch(globalActions.clearAttachments())
    this.props.onMessageFormSubmit(e, props)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.item && this.props.item.status !== 'closed' &&
          <form onSubmit={(e) => this.onMessageFormSubmit(e, this.props)}>
            <input type="hidden" name="message_user_id" value={this.props.user_id} />
            <input type="hidden" name="message_ticket_id" value={this.props.ticket_id} />

            {/* <div className="form-group row">
              <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.title')}</label>
              <div className="col-sm-8">
                <input type="hidden" name="message_id" value={this.props.id && this.props.id} />
                <input type="text" name="message_title" required={true} className="form-control" defaultValue={this.props.title} placeholder={I18n.t('pages.tickets.form.help.title')} />
              </div>
            </div>
            */}

            <div className="form-group row">
              <label className="col-sm-12 col-form-label">You Answer</label>

              <div className="col-sm-12">
                <textarea type="text" name="message_text" className="form-control" defaultValue={this.props.text || ''} required={true} rows="3" placeholder={I18n.t('pages.tickets.form.help.text')}></textarea>
              </div>
            </div>

            {/* <div className="form-group row">
              <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
              <div className="col-sm-8 align-self-center">
                <input id="ticketAttachment" type="file" name="message_attachment" onChange={this.props.onFileChange} value={this.state.file} required={false} className="form-control-file" placeholder={I18n.t('pages.tickets.form.help.attachment')} />
              </div>
            </div>
            */}

            <div className="form-group d-flex flex-column flex-md-row justify-content-md-between">
              <div className="d-flex flex-row justify-content-md-between">
                <button id="contact_submit" className="flex-fill btn btn-outline-primary mb-3 mb-md-0 mr-2" disabled={this.props.loading ? true : false}>
                  {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                  {' ' + I18n.t('pages.tickets.form.submit')}
                </button>

                <div className="file row mb-3 mb-md-0 flex-fill">
                  <div className="upload-btn-wrapper col-12">
                    <button className="btn btn-block">{I18n.t('buttons.select_files')}</button>
                    <input type="file" name="attachments" onChange={this.onFilesChange} required={false} multiple={true} accept="application/pdf, image/*" />
                  </div>
                </div>
              </div>

              {this.props.item &&
                <button onClick={(e) => this.onTicketClose(e, this.props.item)} className='ml-md-2 btn btn-outline-danger'
                  disabled={this.props.loading ? true : false}>
                  {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                  &nbsp;Close my ticket</button>
              }
            </div>

            <AttachmentPreview
              items={this.props.attachments}
            // items={this.props.attachments && this.props.attachments}
            // items={this.state.imagePreviews}
            />

          </form>
        }
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { attachments } = state.global
  const { user } = state.authentication
  const user_id = user.id
  const { loading, item } = state.tickets
  const ticket_id = item && item.id
  return {
    user_id,
    item,
    loading,
    ticket_id,
    attachments,
  }
}

MessageForm.defaultProps = {
  ticket_id: -1
}

const connectedForm = connect(mapStateToProps)(MessageForm)
export { connectedForm as MessageForm }