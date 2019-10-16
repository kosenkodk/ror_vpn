import React from 'react';
import PropTypes from 'prop-types'
import I18n from 'i18n-js/index.js.erb';

class TicketForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      departmentSelectValue: this.props.department && this.props.department || 0
    }
    this.onDepartmentSelectChange = this.onDepartmentSelectChange.bind(this);
  }

  onDepartmentSelectChange(e) {
    this.setState({ departmentSelectValue: event.target.value })
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.onFormSubmit(e, this.props.isEdit)}>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.select_the_department')}</label>
          <div className="col-sm-8">
            <select className="form-control" id="departmentSelectBox" name="department" value={this.state.departmentSelectValue} onChange={this.onDepartmentSelectChange}>
              <option value="0">{I18n.t('pages.tickets.form.help.select_the_department1')}</option>
              <option value="1">{I18n.t('pages.tickets.form.help.select_the_department2')}</option>
              <option value="2">{I18n.t('pages.tickets.form.help.select_the_department3')}</option>
            </select>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.title')}</label>
          <div className="col-sm-8">
            <input type="hidden" name="id" value={this.props.id && this.props.id} />
            <input type="text" name="title" required={true} className="form-control" defaultValue={this.props.title} placeholder={I18n.t('pages.tickets.form.help.title')} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.text')}</label>
          <div className="col-sm-8">
            <textarea type="text" name="text" className="form-control" defaultValue={this.props.text || ''} required={false} rows="3" placeholder={I18n.t('pages.tickets.form.help.text')}></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
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
          </div>
        </div>
      </form>
    )
  }
}

TicketForm.propTypes = {
  id: PropTypes.number,
  department: PropTypes.string,
  status: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
}
export default TicketForm
