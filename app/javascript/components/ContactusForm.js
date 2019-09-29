import React from 'react'
import FlashMessages from './sections/FlashMessages'
import I18n from 'i18n-js/index.js.erb'

class ContactusForm extends React.Component {

  constructor(props) {
    super(props)
    this.message = React.createRef();
    this.message_short = React.createRef();
    this.email = React.createRef();
  }

  render() {
    return (
      <form>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-8 text-center">
            <FlashMessages />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.contact_us.form.email')}</label>
          <div className="col-sm-8">
            <input type="email" required={true} className="form-control" ref={(input) => { this.email = input }} placeholder={I18n.t('pages.contact_us.form.help.email')} />
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
            <input type="text" required={true} className="form-control" ref={(input) => { this.message_short = input }} placeholder={I18n.t('pages.contact_us.form.help.message_short')} />
            {/* <%= f.text_field  :message_short, required: false, type: :text, class: "form-control", placeholder: t('pages.contact_us.form.help.message_short') %> */}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.contact_us.form.message')}</label>
          <div className="col-sm-8">
            <textarea className="form-control" required={false} type="text" rows="3" ref={(input) => { this.message = input }} placeholder={I18n.t('pages.contact_us.form.help.message')}></textarea>
            {/* <%= f.text_area  :message, required: false, type: :text, rows: 3, class: "form-control", placeholder: t('pages.contact_us.form.help.message') %> */}
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-4">
          </div>
          <div className="col-sm-8">
            <br />
            <button id="contact_submit" onClick={(e) => { this.props.handleFormSubmit(e, this.email.value, this.message.value, this.message_short.value); }} className="btn btn-outline-primary btn-block">{I18n.t('pages.contact_us.form.submit')}</button>
            {/* <%=f.submit(t("pages.contact_us.form.submit"), {id: 'contact_submit', class:'btn btn-outline-primary btn-block'})%> */}
          </div>
        </div>
      </form>
    )
  }
}

export default ContactusForm