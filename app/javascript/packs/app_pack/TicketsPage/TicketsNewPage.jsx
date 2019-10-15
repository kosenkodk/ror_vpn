import React from 'react'
import { Link } from 'react-router-dom'
import TicketForm from './TicketForm'
import Sidebar from '../_components/Sidebar'
import { urls } from 'config'

class TicketsNewPage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <Sidebar />
        </div>
        <div className="col-sm-8">
          {/* <div className="row">
            <div className="col-12">
              <FlashMessages error={error} notice={notice}></FlashMessages>
            </div>
          </div> */}
          <div id="tickets" className="container tickets bg-vega shadow-vega mb-4">
            <div className="container">
              <div className="row">
                <div className="col-xs-6 mr-auto">
                  <h2 className="mt-2">Tickets</h2>
                </div>
                <div className="col-xs-6 ml-auto align-self-center">
                  <Link to={urls.tickets_new.path} className="btn btn-outline-success">New</Link>
                  {/* <button onClick={this.addItem} className="btn btn-outline-success">New</button> */}
                  {/* <TicketAddModal onFormSubmit={this.onFormSubmit} isEdit={false} {...this.props} /> */}
                </div>
              </div>
            </div>

            <TicketForm />

          </div>

        </div>
      </div>
    )
  }
}

export default TicketsNewPage