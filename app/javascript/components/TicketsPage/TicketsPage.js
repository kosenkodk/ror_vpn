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
import { httpPlainRequest } from 'helpers/http'
import TicketAddModal from './TicketAddModal'

class TicketsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      error: '',
      notice: ''
    };
    this.onDeleteItem = this.onDeleteItem.bind(this)
    this.onViewItem = this.onViewItem.bind(this)
    this.onEditItem = this.onEditItem.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
  }

  onAddItem(e, item) {
    e.preventDefault()
    fetch(httpSecuredRequest(`${config.apiUrl}/tickets`, 'POST', { ticket: item }, this.props.appState.csrf))
      .then(handleErrors)
      .then((item, message) => {
        this.setState(prevState => {
          return {
            items: [...prevState.items, item] // prevState.items.concat(item);
          }
        })
        this.setState({
          error: '',
          notice: item.notice && item.notice || I18n.t('api.notices.item_added'),
        })
      })
      .catch((error) => {
        this.setState({ error: error.message || I18n.t('api.errors.item_added'), notice: '' })
      })
  }

  onViewItem(e, item) {
    e.preventDefault()
    // this.props.history.push(`/tickets/${response.id}`)
    return
    fetch(httpPlainRequest(`${config.apiUrl}/tickets/${item.id}`, 'GET', {}))
      .then(handleErrors)
      .then((response, message) => {

        this.setState({
          error: '',
          notice: item.notice && item.notice || I18n.t('api.notices.item_viewed'),
        })
      })
      .catch((error) => {
        this.setState({ error: error.message || I18n.t('api.errors.item_viewed'), notice: '' })
      })
  }

  onEditItem(e, item) {
    e.preventDefault()
    fetch(httpSecuredRequest(`${config.apiUrl}/tickets/${item.id}`, 'PATCH', { ticket: item }, this.props.appState.csrf))
      .then(handleErrors)
      .then((response, message) => {
        this.setState(prevState => {
          return {
            items: prevState.items.map(itemPrev => itemPrev.id == item.id ? item : itemPrev)
          }
        })
        this.setState({
          error: '',
          notice: item.notice && item.notice || I18n.t('api.notices.item_updated'),
        })
      })
      .catch((error) => {
        this.setState({ error: error.message || I18n.t('api.errors.item_updated'), notice: '' })
      })
  }

  onDeleteItem(e, item) {
    e.preventDefault()
    fetch(httpSecuredRequest(`${config.apiUrl}/tickets/${item.id}`, 'DELETE', {}, this.props.appState.csrf))
      .then(handleErrors)
      .then((response, message) => {
        this.setState(prevState => {
          return {
            // items: prevState.items.splice(prevState.items.indexOf(item), 1),
            items: prevState.items.filter(item2 => item2.id !== item.id)
          }
        })
        this.setState({
          error: '',
          notice: item.notice && item.notice || I18n.t('api.notices.item_deleted'),
        })
      })
      .catch((error) => {
        this.setState({ error: error.message || I18n.t('api.errors.item_deleted'), notice: '' })
      })
  }

  onFormSubmit(e, isEdit) {
    e.preventDefault()
    // item = {ticket: { title: 'new ticket' }}
    let formData = new FormData(e.target)
    let data = {}
    formData.forEach((value, key) => { data[key] = value });

    // let item = {ticket: data}
    // const item = formData.map((value, key) => { key: value })
    console.log('onFormSubmit', data)

    if (isEdit) {
      this.onEditItem(e, data)
    } else {
      this.onAddItem(e, data)
    }
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
                {/* <button onClick={this.addItem} className="btn btn-outline-success">New</button> */}
                <TicketAddModal onFormSubmit={this.onFormSubmit} isEdit={false} {...this.props} />
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
                    <Ticket key={item.id} {...item} onFormSubmit={this.onFormSubmit} onDeleteItem={this.onDeleteItem} onEditItem={this.onEditItem} />
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
