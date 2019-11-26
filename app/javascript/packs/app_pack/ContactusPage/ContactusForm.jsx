import React from 'react';
import { I18n } from 'helpers';
import SelectBoxDepartment from '../_components/SelectBoxDepartment';

class ContactusForm extends React.Component {

  constructor(props) {
    super(props)
    this.message = React.createRef();
    this.message_short = React.createRef();
    this.email = React.createRef();
  }

  render() {
    return (
      <form onSubmit={(e) => { this.props.handleFormSubmit(e); }} className="col">
        <div className="form-group row">
          <label className="col-sm-3 align-self-center col-form-label col-form-label-lg text-right">{I18n.t('pages.contact_us.form.email')}</label>
          <div className="col-sm-4">
            <input type="email" name="email" required={false} className="form-control form-control-lg" ref={(input) => { this.email = input }} placeholder={I18n.t('pages.contact_us.form.help.email')} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 align-self-center col-form-label col-form-label-lg text-right">{I18n.t('pages.contact_us.form.select_the_department')}</label>
          <div className="col-sm-4 align-self-center">
            <SelectBoxDepartment departments={this.props.departments && this.props.departments} className="form-control form-control-lg" />
            {/* <select className="form-control" id="departmentSelectBox">
              <option>{I18n.t('pages.contact_us.form.help.select_the_department1')}</option>
              <option>{I18n.t('pages.contact_us.form.help.select_the_department2')}</option>
              <option>{I18n.t('pages.contact_us.form.help.select_the_department3')}</option>
            </select> */}
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 align-self-center col-form-label col-form-label-lg text-right">{I18n.t('pages.contact_us.form.message_short')}</label>
          <div className="col-sm-4 text-right">
            <input type="text" name="message_short" required={true} className="form-control form-control-lg" ref={(input) => { this.message_short = input }} placeholder={I18n.t('pages.contact_us.form.help.message_short')} />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label col-form-label-lg text-right">{I18n.t('pages.contact_us.form.message')}</label>
          <div className="col-sm-6 mr-sm-5">
            <textarea type="text" name="message" className="form-control form-control-lg" required={false} rows="4" ref={(input) => { this.message = input }} placeholder={I18n.t('pages.contact_us.form.help.message')}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <div className="offset-sm-3 col-sm-6">
            <br />
            <button id="contact_submit" className="btn btn-lg btn-outline-primary btn-block">{I18n.t('pages.contact_us.form.submit')}</button>
            {/* <button id="contact_submit" onClick={(e) => { this.props.handleFormSubmit(e, this.email.value, this.message.value, this.message_short.value); }} className="btn btn-outline-primary btn-block">{I18n.t('pages.contact_us.form.submit')}</button> */}
          </div>
        </div>
      </form>
    )
  }
}

export default ContactusForm