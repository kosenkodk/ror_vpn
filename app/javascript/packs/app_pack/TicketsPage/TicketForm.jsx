import React from 'react';
import PropTypes from 'prop-types'
import I18n from 'i18n-js/index.js.erb';
import SelectBoxDepartment from '../_components/SelectBoxDepartment';

class TicketForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.onFileChange = this.onFileChange.bind(this)
  }

  onFileChange(e) {
    e.preventDefault();
    console.log('onFileChange', e.target.files);
    // if (e.target && e.target.files && e.target.files.length > 0)
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.onFormSubmit(e, this.props.isEdit)}>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.select_the_department')}</label>
          <div className="col-sm-8">
            <SelectBoxDepartment departments={this.props.departments} />
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
            {/* <input id="ticketAttachment" type="file" name="attachment" onChange={this.onFileChange} value={this.state.file} required={false} className="form-control-file" placeholder={I18n.t('pages.tickets.form.help.attachment')} /> */}
            <input id="ticketAttachment" type="file" name="attachment" onChange={this.props.onFileChange} value={this.state.file} required={false} className="form-control-file" placeholder={I18n.t('pages.tickets.form.help.attachment')} />
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
  departments: PropTypes.array,
  status: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.string,
}
export default TicketForm
