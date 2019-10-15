import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';
import Ticket from './Ticket';
import Sidebar from '../_components/Sidebar';
import { urls } from 'config';

// import { Switch, Router, Route } from 'react-router-dom'
// import { Header, PrivateRoute } from '../_components'
// import TicketsNewPage from './TicketsNewPage'

class TicketsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(ticketActions.getAll());
  }

  render() {
    const { tickets } = this.props;
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

            <div className="table-responsive">
              <table className="table text-white table-striped">
                <thead>
                  <tr>
                    <th colSpan="3" scope="col" className="w-5"></th>
                    <th scope="col" className="w-10">#</th>
                    <th scope="col" className="w-50">Title</th>
                    <th scope="col" className="w-20">Department</th>
                    {/* <th>Text</th> */}
                    <th scope="col" className="w-15">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.items && tickets.items.length > 0 ?
                    tickets.items.map((ticket, index) => <Ticket key={ticket.id} no={index + 1} {...ticket} />)
                    :
                    <tr>
                      <td colSpan="7" scope="row">
                        {tickets.loading && <em>Loading tickets...</em>}
                        {tickets.error ? <span className="text-danger">ERROR: {tickets.error}</span>
                          :
                          <p>No items to display</p>}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tickets } = state;
  return {
    tickets
  };
}

const connectedTicketsPage = connect(mapStateToProps)(TicketsPage);
export { connectedTicketsPage as TicketsPage };