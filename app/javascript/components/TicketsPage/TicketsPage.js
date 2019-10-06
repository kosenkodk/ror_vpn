import React from 'react'
import PropTypes from 'prop-types'
import Ticket from './Ticket'
import { withRouter } from "react-router-dom"
import Sidebar from '../Sidebar'
// import { Link } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import FlashMessages from '../sections/FlashMessages'
import { httpRequestAndRefreshToken, httpSecuredRequest, handleErrors } from 'helpers/http'
import { config } from 'config'
import I18n from 'i18n-js/index.js.erb'

class TicketsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      error: '',
      notice: ''
    };
  }

  addItem = (e) => {
    e.preventDefault()
    console.log('add item', e)
    fetch(httpSecuredRequest(`${config.apiUrl}/tickets`, 'POST', { ticket: { title: 'new ticket' } }, this.props.appState.csrf))
      .then(handleErrors)
      .then((item, message) => {

        console.log('add ticket success', item, message)
        this.setState(prevState => {
          items: [...prevState.items, item] // prevState.items.concat(item);
        })
        this.setState({
          error: '',
          notice: item.notice && item.notice || I18n.t('api.notices.item_added'),
        })
      })
      .catch((error) => {
        this.setState({ error: error.message || I18n.t('api.errors.item_added'), notice: '' })
        console.log('add ticket error', error)
      })
  }

  deleteItem = (e) => {

  }

  render() {
    const { items, error, notice } = this.state;
    return (
      <div className="row">
        <div className="col-sm-4">
          <Sidebar />
        </div>
        <div className="col-sm-8">
          <div className="row">

            <div className="col-12">
              <FlashMessages error={error} notice={notice}></FlashMessages>
            </div>
          </div>
          <div id="tickets" className="container tickets bg-vega shadow-vega mb-4">
            <div className="row">

              <div className="col-sm-6 text-left">
                <h2 className="mt-2">Tickets</h2>
              </div>
              <div className="col-sm-6 text-right align-self-center">
                {/* <Link to="/tickets/new" className="btn btn-outline-success">New</Link> */}
                <button onClick={this.addItem} className="btn btn-outline-success">New</button>
              </div>
            </div>
            <table className="table text-white">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Department</th>
                  {/* <th>Text</th> */}
                  <th>Status</th>
                  <th colSpan="3"></th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map(item => (
                    <tr key={item.id} >
                      <Ticket {...item} />
                      {/* <Ticket title={item.title} /> */}
                    </tr>
                  ))
                }

                {
                  items.length <= 0 &&
                  <tr>
                    <td colSpan="3">No items to display</td>
                  </tr>
                }
              </tbody>
            </table>
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
      .then(response => this.setState({ items: response, error: response.error, notice: response.notice }))
      .catch((err) => {
        this.setState({ error: err.message, notice: '' })
        console.log(err)
      });
  }

}

TicketsPage.propTypes = {
  items: PropTypes.array
};

export default withRouter(TicketsPage)
