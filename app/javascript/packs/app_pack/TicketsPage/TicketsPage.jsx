import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ticketActions, alertActions } from '../_actions';
import TicketTableItem from './TicketTableItem';
import { urls } from 'config';
import { Paginator } from '../_components';

class TicketsPage extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn)
      this.props.dispatch(ticketActions.getAll());
    else {
      // this.props.history.push(urls.signin.path);
      this.props.dispatch(alertActions.error(I18n.t('api.errors.unauthorized')));
    }
  }

  render() {
    const { items, loading, error } = this.props;
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
              {items && items.length > 0 ?
                items.map((item, index) => <TicketTableItem key={item.id} no={index + 1} {...item} />)
                :
                <tr>
                  <td colSpan="7" scope="row">
                    {loading ? <em>Loading tickets...</em> : <em>No items to display</em>}
                    {/* {error && <span className="text-danger">ERROR: {error}</span>} */}
                  </td>
                </tr>
              }
            </tbody>
          </table>

          <Paginator />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication
  const { items, loading, error } = state.tickets;
  return {
    loggedIn,
    items,
    loading,
    error
  };
}

const connectedTicketsPage = connect(mapStateToProps)(TicketsPage);
export { connectedTicketsPage as TicketsPage };