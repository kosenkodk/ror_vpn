import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { ticketActions } from '../_actions'
import { urls } from 'config'
import { I18n } from 'helpers'
import { ChatRoom, Messages } from '../_components'

class TicketsViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
    }
  }

  componentDidMount() {
    this.props.dispatch(ticketActions.view(this.state.id))
  }

  render() {
    const { item, loggedIn } = this.props

    return (
      <div id="tickets_new" className="row mb-4">

        <div className="col-12 bg-vega shadow-vega">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-6">
                <h2 className="mt-2">Ticket #{item && item.id}</h2>
              </div>
              <div className="col-xs-6 ml-auto align-self-center">
                <Link to={urls.tickets.path} className="btn btn-outline-success">Back</Link>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <h4 className="col-sm-4">{I18n.t('pages.tickets.form.title')}</h4>
            <div className="col-sm-8">
              <h4>{item && item.title}</h4>
            </div>
          </div>

          <ChatRoom id={this.state.id} messages={item && item.messages} />

          {/* initial ticket message with attachment */}

          {item && item.messages && item.messages.length > 0 &&
            <Messages items={item.messages} />
          }

          {/* {item && item.text &&
            <div className="ticket_message">
              <div className="form-group row">
                <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">From:</label>
                <div className="col-sm-8 align-self-center">
                  You at {item && item.created_at}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">Message:</label>
                <div className="col-sm-8 align-self-center">
                  {item && item.text}
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
          } */}
        </div>
        {/* // View Ticket
        <div className="col-lg-6">
          <div className="row">
            <div className="col bg-vega shadow-vega">

              <div className="row">
                <div className="col-xs-6 mr-auto">
                  <h2 className="mt-2">View Ticket</h2>
                </div>
                <div className="col-xs-6 ml-auto align-self-center">
                  <Link to={urls.tickets.path} className="btn btn-outline-success">Back</Link>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-4">{I18n.t('pages.tickets.form.status')}</label>
                <div className="col-sm-8 ">
                  {item && item.status}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-4">{I18n.t('pages.tickets.form.department')}</label>
                <div className="col-sm-8 ">
                  {item && item.department && item.department.title}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-4">{I18n.t('pages.tickets.form.title')}</label>
                <div className="col-sm-8">
                  {item && item.title}
                </div>
              </div>

              <div className="form-group row">
                <label className="col-sm-4">{I18n.t('pages.tickets.form.text')}</label>
                <div className="col-sm-8">
                  {item && item.text}
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="ticketAttachment" className="col-sm-4">{I18n.t('pages.tickets.form.attachment')}</label>
                <div className="col-sm-8">
                  {item && item.attachment_url && <a href={item.attachment_url}>{item.attachment_name && item.attachment_name}</a>}
                </div>
              </div>
            </div>

          </div>
        </div>
      */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tickets, authentication } = state
  const { loading, item } = tickets
  const { loggedIn } = authentication
  return { loading, item, loggedIn }
}

const connectedApp = connect(mapStateToProps)(TicketsViewPage)
export { connectedApp as TicketsViewPage }