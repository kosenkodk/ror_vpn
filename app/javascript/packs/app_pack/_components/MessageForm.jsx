import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { ticketActions } from '../_actions';

class MessageForm extends React.Component {

  onTicketClose(e, id) {
    this.props.dispatch(ticketActions.update(id));
    e.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.item && this.props.item.status !== 'closed' &&
          <form onSubmit={(e) => this.props.onMessageFormSubmit(e, this.props)}>
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
                <textarea type="text" name="message_text" className="form-control" defaultValue={this.props.text || ''} required={false} rows="3" placeholder={I18n.t('pages.tickets.form.help.text')}></textarea>
              </div>
            </div>

            {/* <div className="form-group row">
              <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
              <div className="col-sm-8 align-self-center">
                <input id="ticketAttachment" type="file" name="message_attachment" onChange={this.props.onFileChange} value={this.state.file} required={false} className="form-control-file" placeholder={I18n.t('pages.tickets.form.help.attachment')} />
              </div>
            </div>
            */}

            <div className="form-group d-flex justify-content-between">

              <button id="contact_submit" className="btn btn-outline-primary" disabled={this.props.loading ? true : false}>
                {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                {' ' + I18n.t('pages.tickets.form.submit')}
              </button>


              {this.props.item &&
                <button onClick={(e) => this.onTicketClose(e, this.props.item)} className='btn btn-outline-danger'
                  disabled={this.props.loading ? true : false}>
                  {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                  Close my ticket</button>
              }

            </div>
          </form>
        }
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication
  const user_id = user.id
  const { loading, item } = state.tickets
  const ticket_id = item && item.id
  return {
    user_id,
    item,
    loading,
    ticket_id,
  }
}

MessageForm.defaultProps = {
  ticket_id: -1
}

const connectedForm = connect(mapStateToProps)(MessageForm)
export { connectedForm as MessageForm }