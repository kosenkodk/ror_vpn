import React from 'react'
// import PropTypes from 'prop-types'
// import { withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';
import I18n from 'i18n-js/index.js.erb'

class TicketForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <form onSubmit={(e) => this.props.onFormSubmit(e, this.props.isEdit)}>
        {/* <form onSubmit={(e) => this.props.onFormSubmit(e, this.props.isEdit)}> */}

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.select_the_department')}</label>
          <div className="col-sm-8">
            <select className="form-control" id="departmentControlSelect">
              <option>{I18n.t('pages.tickets.form.help.select_the_department1')}</option>
              <option>{I18n.t('pages.tickets.form.help.select_the_department2')}</option>
              <option>{I18n.t('pages.tickets.form.help.select_the_department3')}</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.title')}</label>
          <div className="col-sm-8">
            <input type="hidden" name="id" value={this.props.id && this.props.id} />
            <input type="text" name="title" required={true} className="form-control" value={this.props.title} placeholder={I18n.t('pages.tickets.form.help.title')} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.text')}</label>
          <div className="col-sm-8">
            <textarea type="text" name="text" className="form-control" value={this.props.text} required={false} rows="3" placeholder={I18n.t('pages.tickets.form.help.text')}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label for="ticketAttachment" className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
          <div className="col-sm-8">
            <input id="ticketAttachment" type="file" name="attachment" required={false} className="form-control-file" placeholder={I18n.t('pages.tickets.form.help.attachment')} />
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
      </form>
    )
  }
}

export default TicketForm
