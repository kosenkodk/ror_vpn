import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';
import TicketTableItem from './TicketTableItem';
import { urls } from 'config';

class TicketsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(ticketActions.getAll());
  }

  render() {
    const { tickets } = this.props;
    return (
      <div id="tickets" className="container tickets bg-vega shadow-vega mb-4">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 mr-auto">
              <h2 className="mt-2">Tickets</h2>
            </div>
            <div className="col-xs-6 ml-auto align-self-center">
              <Link to={urls.tickets_new.path} className="btn btn-outline-success">New</Link>
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
                tickets.items.map((ticket, index) => <TicketTableItem key={ticket.id} no={index + 1} {...ticket} />)
                :
                <tr>
                  <td colSpan="7" scope="row">
                    {tickets.loading ? <em>Loading tickets...</em> : <em>No items to display</em>}
                    {/* {tickets.error && <span className="text-danger">ERROR: {tickets.error}</span>} */}
                  </td>
                </tr>
              }
            </tbody>
          </table>
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