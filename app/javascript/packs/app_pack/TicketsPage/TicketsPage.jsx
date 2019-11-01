import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ticketActions, alertActions } from '../_actions';
import TicketTableItem from './TicketTableItem';
import { urls } from 'config';
import { Paginator } from '../_components';
import { I18n } from 'helpers'

class TicketsPage extends React.Component {

  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose(e, id) {
    this.props.dispatch(ticketActions.update(id));
    e.preventDefault();
  }

  onPageChange(e, page) {
    this.props.dispatch(ticketActions.getAll({ page: page, status: this.props.status }));
    e.preventDefault();
  }

  componentDidMount() {
    if (this.props.loggedIn)
      this.props.dispatch(ticketActions.getAll({ page: this.props.page, status: this.props.status }));
    else {
      // this.props.history.push(urls.signin.path);
      this.props.dispatch(alertActions.error(I18n.t('api.errors.unauthorized')));
    }
  }

  filterByStatus(e, status) {
    this.props.dispatch(ticketActions.filterBy({ page: this.props.page, status: status }));
    this.props.dispatch(ticketActions.getAll({ page: this.props.page, status: status }));

    e.preventDefault();
  }

  render() {
    const { error, status, items, loading, pages, page, loggedIn } = this.props
    return (
      <div className="row">
        <div className="col-md-9 col-lg-10">

          <div id="tickets" className={`tickets bg-vega shadow-vega mb-4 ${loggedIn ? 'container-fluid' : 'container'}`}>
            <div className={`${loggedIn ? 'container-fluid' : 'container'}`}>
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
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th colSpan="1" scope="col" className="w-5"></th>
                    <th scope="col" className="w-20">Department</th>
                    <th scope="col" className="w-15">Status</th>
                    <th scope="col" className="w-35">Subject</th>
                    <th scope="col" className="w-15">Date</th>
                    <th scope="col" className="w-10">#</th>
                    {/* <th>Text</th> */}
                  </tr>
                </thead>
                <tbody>
                  {items && items.length > 0 ?
                    items.map((item, index) => <TicketTableItem key={item.id}
                      // no={page > 1 ? (page * items.length - items.length) + index + 1 : index + 1} 
                      onClose={this.onClose}
                      no={item.id}
                      {...item} />)
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
              <Paginator onPageChange={this.onPageChange} pageCurrent={page} pageTotal={pages} />
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-2 d-none d-md-block">
          {/* <ul className="sidebar list-group shadow-vega bg-vega mb-4">
            <Link smooth to="/#" onClick={this.displayOpenedTickets} activeClassName="active"
              location={{ pathname: document.location.pathname + document.location.hash }}>
              <li className="list-group-item">opened</li>
            </Link>
          </ul> */}
          <button onClick={(e) => this.filterByStatus(e, "")} className={`btn btn-outline-pink btn-block text-left ${status === '' ? this.props.activeClass : ''}`} > All</button>
          <button onClick={(e) => this.filterByStatus(e, "opened")} className={`btn btn-outline-pink btn-block text-left ${status === 'opened' ? this.props.activeClass : ''}`}>Opened</button>
          <button onClick={(e) => this.filterByStatus(e, "closed")} className={`btn btn-outline-pink btn-block text-left ${status === 'closed' ? this.props.activeClass : ''}`} > Closed</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication
  const { items, page, pages, status, loading, error } = state.tickets;
  return {
    items,
    page,
    pages,
    loggedIn,
    loading,
    error,
    status
  };
}

TicketsPage.defaultProps = {
  status: '',
  activeClass: '', // 'active'
}

const connectedTicketsPage = connect(mapStateToProps)(TicketsPage);
export { connectedTicketsPage as TicketsPage };