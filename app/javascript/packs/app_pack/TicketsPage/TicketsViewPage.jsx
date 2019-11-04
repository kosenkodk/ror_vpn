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
          <div className="container-section">
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
            {item && item.messages && <Messages items={item.messages} />}
          </div>
        </div>
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