import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { ticketActions } from '../_actions'
// import TicketForm from './TicketForm'
import { urls } from 'config'
import I18n from 'i18n-js/index.js.erb'

class TicketsViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id
      // this.props.token || this.props.match && this.props.match.params && this.props.match.params.token
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
            {item && item.department}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.title')}</label>
          <div className="col-sm-8">
            {/* <input type="hidden" name="id" value={this.props.id && this.props.id} />
            <input type="text" name="title" required={true} className="form-control" defaultValue={this.props.title} placeholder={I18n.t('pages.tickets.form.help.title')} /> */}
            {item && item.title}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.text')}</label>
          <div className="col-sm-8">
            {/* <textarea type="text" name="text" className="form-control" defaultValue={this.props.text || ''} required={false} rows="3" placeholder={I18n.t('pages.tickets.form.help.text')}></textarea> */}
            {item && item.text}
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
          <div className="col-sm-8">
            {item && item.attachment}
            {/* <input id="ticketAttachment" type="file" name="attachment" required={false} className="form-control-file" placeholder={I18n.t('pages.tickets.form.help.attachment')} /> */}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-4">
          </div>
          <div className="col-sm-8">
            <br />
            <button id="contact_submit" className="btn btn-outline-primary btn-block">{I18n.t('pages.tickets.form.submit')}</button>
            {/* <button id="contact_submit" onClick={(e) => { this.props.handleFormSubmit(e, this.email.value, this.message.value, this.message_short.value); }} className="btn btn-outline-primary btn-block">{I18n.t('pages.tickets.form.submit')}</button> */}
            {/* <%=f.submit(t("pages.tickets.form.submit"), {id: 'contact_submit', class:'btn btn-outline-primary btn-block'})%> */}
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