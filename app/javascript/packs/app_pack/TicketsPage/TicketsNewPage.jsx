import React from 'react'
import { Link } from 'react-router-dom'
import TicketForm from './TicketForm'
import { urls } from 'config'

class TicketsNewPage extends React.Component {
  render() {
    return (
      <div id="tickets" className="container tickets bg-vega shadow-vega mb-4">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 mr-auto">
              <h2 className="mt-2">Tickets</h2>
            </div>
            <div className="col-xs-6 ml-auto align-self-center">
              <Link to={urls.tickets.path} className="btn btn-outline-success">Back</Link>
            </div>
          </div>
        </div>
        <TicketForm />
      </div>
    )
  }
}

export default TicketsNewPage