import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pageActions, ticketActions, alertActions } from '../_actions';
import TicketTableItem from './TicketTableItem';
import { urls } from 'config';
import { Paginator } from '../_components';
import { I18n } from 'helpers';

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

  setTitle() {
    this.props.dispatch(pageActions.setTitle(I18n.t('nav_menu.tickets')));
  }

  componentWillUpdate() {
    this.setTitle();
  }

  componentDidMount() {
    // this.setTitle();
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
        <div className="ticket_statuses col-12 mb-3">
          <ul className="nav">
            <li className="nav-item">
              <a onClick={(e) => this.filterByStatus(e, "")} className={`nav-link ${status === '' ? this.props.activeClass : ''}`} > All</a>
            </li>
            <li className="nav-item">
              <a onClick={(e) => this.filterByStatus(e, "opened")} className={`nav-link ${status === 'opened' ? this.props.activeClass : ''}`}>Opened</a>
            </li>
            <li className="nav-item">
              <a onClick={(e) => this.filterByStatus(e, "closed")} className={`nav-link ${status === 'closed' ? this.props.activeClass : ''}`} > Closed</a>
            </li>
            <li className="nav-item ml-auto">
              <Link to={urls.tickets_new.path} className="btn btn-sm btn-outline-primary">New ticket</Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link disabled" href="#">Disabled</a>
            </li> */}
          </ul>

          {/* <ul className="sidebar list-group shadow-vega bg-vega mb-4">
            <Link smooth to="/#" onClick={this.displayOpenedTickets} activeClassName="active"
              location={{ pathname: document.location.pathname + document.location.hash }}>
              <li className="list-group-item">opened</li>
            </Link>
          </ul> */}
        </div>

        <div className="col-12">
          <div id="tickets" className={`tickets mb-4 ${loggedIn ? 'container-fluid' : 'container'}`}>

            <div className="container-section">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col" className="">#</th>
                      <th scope="col" className="">Department</th>
                      <th scope="col" className="">Subject</th>
                      <th scope="col" className="">Date</th>
                      <th scope="col" className="">Status</th>
                      <th colSpan="1" scope="col" className="">Action</th>
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
  activeClass: 'active',
}

const connectedTicketsPage = connect(mapStateToProps)(TicketsPage);
export { connectedTicketsPage as TicketsPage };