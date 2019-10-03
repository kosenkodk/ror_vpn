import React from 'react'
import PropTypes from 'prop-types'
import Ticket from './Ticket'
import { withRouter } from "react-router-dom"
import Sidebar from '../Sidebar'

class TicketsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  render() {
    const { items } = this.state;
    return (
      <div className="row">
        <div className="col-sm-4">
          <Sidebar />
        </div>
        <div className="col-sm-8">
          <div id="tickets" className="tickets row">
            <h1>Tickets</h1>
            {
              items.map(item => (
                <div key={item.id} className="col-xs-12 col-sm-6 col-md-4">
                  <Ticket {...item} />
                  {/* <Ticket title={item.title} /> */}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate() {

  }

  componentDidMount() {
    if (this.props.items && this.props.items.length > 0) {
      console.log('getting data from props ...')
      // this.setState({ items: this.props.items })
      return;
    }
    console.log('getting data from api...')

    const url = "api/v1/tickets";
    let options = {
      method: 'GET', // *GET, POST, PATCH, PUT, DELETE, etc.
      credentials: 'include', // same-origin, include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.props.appState.csrf
      }
    }

    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ items: response }))
      .catch((err) => {
        console.log(err)
      });
  }

}

TicketsPage.propTypes = {
  items: PropTypes.array
};

export default withRouter(TicketsPage)
