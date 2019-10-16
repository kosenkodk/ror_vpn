import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { ticketActions } from '../_actions'
import TicketForm from './TicketForm'
import { urls } from 'config'

class TicketsNewPage extends React.Component {
  constructor(props) {
    super(props)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    let data = {}
    formData.forEach((value, key) => { data[key] = value });
    this.props.dispatch(ticketActions.add(data))
  }

  render() {
    const { items } = this.props
    return (
      <div id="tickets_new" className="container bg-vega shadow-vega mb-4 pb-1">
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
        <TicketForm onFormSubmit={this.onFormSubmit} departments={items} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loading, items } = state.departments
  return { loading, items }
}

const connectedApp = connect(mapStateToProps)(TicketsNewPage);
export { connectedApp as TicketsNewPage };