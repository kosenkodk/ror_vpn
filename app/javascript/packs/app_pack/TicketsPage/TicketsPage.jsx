import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ticketActions } from '../_actions';

class TicketsPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(ticketActions.getAll());
  }

  render() {
    const { user, tickets } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user && user.email}!</h1>
        <p>You're logged in with React & JWT!!</p>
        <h3>Tickets from secure api end point:</h3>
        {tickets.loading && <em>Loading tickets...</em>}
        {tickets.error && <span className="text-danger">ERROR: {tickets.error}</span>}
        {tickets.items &&
          <ul>
            {tickets.items.map((ticket, index) =>
              <li key={ticket.id}>
                {ticket.title + ' ' + ticket.text}
              </li>
            )}
          </ul>
        }
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tickets, authentication } = state;
  const { user } = authentication;
  return {
    user,
    tickets
  };
}

const connectedTicketsPage = connect(mapStateToProps)(TicketsPage);
export { connectedTicketsPage as TicketsPage };