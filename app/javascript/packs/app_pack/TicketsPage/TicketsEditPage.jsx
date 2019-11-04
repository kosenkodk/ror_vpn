import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { ticketActions } from '../_actions'
import { TicketForm } from './TicketForm'
import { urls } from 'config'
import { FormDataAsJsonFromEvent } from '../_helpers'

class TicketsEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.dispatch(ticketActions.add(FormDataAsJsonFromEvent(e)))
  }

  render() {
    return (
      <div id="tickets_new" className="container bg-vega shadow-vega mb-4 pb-1">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 mr-auto">
              <h2 className="mt-2">Edit Ticket</h2>
            </div>
            <div className="col-xs-6 ml-auto align-self-center">
              <Link to={urls.tickets.path} className="btn btn-outline-success">Back</Link>
            </div>
          </div>
        </div>
        <TicketForm onFormSubmit={this.onFormSubmit} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loading } = state
  return { loading }
}

const connectedApp = connect(mapStateToProps)(TicketsEditPage);
export { connectedApp as TicketsEditPage };