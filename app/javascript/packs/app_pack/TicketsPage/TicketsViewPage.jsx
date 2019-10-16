import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { ticketActions } from '../_actions'
import { urls } from 'config'
import I18n from 'i18n-js/index.js.erb'

class TicketsViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id
    }
  }

  componentDidMount() {
    this.props.dispatch(ticketActions.view(this.state.id))
  }

  render() {
    const { item, loggedIn } = this.props;

    return (
      <div id="tickets_new" className="container bg-vega shadow-vega mb-4 pb-1">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 mr-auto">
              <h2 className="mt-2">Tickets</h2>
            </div>
            <div className="col-xs-6 ml-auto align-self-center">
              <Link to={urls.tickets.path} className="btn btn-outline-success">Back</Link>
            </div>
          </div>
        </div>

        {/* TODO: display status <p>{item && item.status}</p> */}

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.department')}</label>
          <div className="col-sm-8 ">
            {/* <select className="form-control" id="departmentSelectBox">
              {[
                { name: I18n.t('pages.tickets.form.help.select_the_department1'), value: 1 },
                { name: I18n.t('pages.tickets.form.help.select_the_department2'), value: 2 },
                { name: I18n.t('pages.tickets.form.help.select_the_department3'), value: 3 },
              ].map(item => <option key={item.id} value={item.value}
                selected={item.value === item && item.department ? true : false}>
                {item.name}</option>
              )}
            </select> */}
            {item && item.department && item.department.title}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.title')}</label>
          <div className="col-sm-8">
            {item && item.title}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.text')}</label>
          <div className="col-sm-8">
            {item && item.text}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
          <div className="col-sm-8">
            {item && item.attachment}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tickets, authentication } = state
  const { loading, item } = tickets
  const { loggedIn } = authentication
  return { loading, item, loggedIn }
}

const connectedApp = connect(mapStateToProps)(TicketsViewPage);
export { connectedApp as TicketsViewPage };