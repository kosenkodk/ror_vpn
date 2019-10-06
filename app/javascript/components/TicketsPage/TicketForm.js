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
      <form>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.contact_us.form.email')}</label>
          <div className="col-sm-8">
            <input type="email" name="contact[email]" required={true} className="form-control" placeholder={I18n.t('pages.contact_us.form.help.email')} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.contact_us.form.select_the_department')}</label>
          <div className="col-sm-8">
            <select className="form-control" id="departmentControlSelect">
              <option>{I18n.t('pages.contact_us.form.help.select_the_department1')}</option>
              <option>{I18n.t('pages.contact_us.form.help.select_the_department2')}</option>
              <option>{I18n.t('pages.contact_us.form.help.select_the_department3')}</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.contact_us.form.message_short')}</label>
          <div className="col-sm-8">
            <input type="text" name="contact[message_short]" required={true} className="form-control" placeholder={I18n.t('pages.contact_us.form.help.message_short')} />
            {/* <%= f.text_field  :message_short, required: false, type: :text, class: "form-control", placeholder: t('pages.contact_us.form.help.message_short') %> */}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.contact_us.form.message')}</label>
          <div className="col-sm-8">
            <textarea type="text" name="contact[message]" className="form-control" required={false} rows="3" placeholder={I18n.t('pages.contact_us.form.help.message')}></textarea>
            {/* <%= f.text_area  :message, required: false, type: :text, rows: 3, class: "form-control", placeholder: t('pages.contact_us.form.help.message') %> */}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-4">
          </div>
          <div className="col-sm-8">
            <br />
            <button id="contact_submit" className="btn btn-outline-primary btn-block">{I18n.t('pages.contact_us.form.submit')}</button>
            {/* <button id="contact_submit" onClick={(e) => { this.props.handleFormSubmit(e, this.email.value, this.message.value, this.message_short.value); }} className="btn btn-outline-primary btn-block">{I18n.t('pages.contact_us.form.submit')}</button> */}
            {/* <%=f.submit(t("pages.contact_us.form.submit"), {id: 'contact_submit', class:'btn btn-outline-primary btn-block'})%> */}
          </div>
        </div>
      </form>
    )
  }
}

export default TicketForm
