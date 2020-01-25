import React from 'react';
import PropTypes from 'prop-types'
import { I18n } from 'helpers';
import SelectBoxDepartment from '../_components/SelectBoxDepartment';
import { connect } from 'react-redux';
import { ticketActions, globalActions } from '../_actions';

class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this.onFilesChange = this.onFilesChange.bind(this);
  }

  onFilesChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      this.props.dispatch(globalActions.setAttachments(e.target.files))
      return
    }
    this.props.dispatch(globalActions.clearAttachments())
  }

  onTicketClose(e, id) {
    this.props.dispatch(ticketActions.update(id));
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.onFormSubmit(e, this.props.isEdit)}>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.select_the_department')}</label>
          <div className="col-sm-8">
            <SelectBoxDepartment departments={this.props.departments && this.props.departments} />
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
            <textarea type="text" name="text" className="form-control" defaultValue={this.props.text || ''} required={false} rows="6" placeholder={I18n.t('pages.tickets.form.help.text')}></textarea>
          </div>
        </div>

        {/* custom file input - multi file upload with images preview */}
        <div className="form-group row">
          <div className="col-sm-4">
            <label className="col-form-label">{I18n.t('pages.tickets.form.attachments')}</label>
          </div>

          <div className="col-sm-8">
            <div className="file row">
              <div className="upload-btn-wrapper col">
                <button className="btn btn-xs-block">{I18n.t('buttons.select_files')}</button>
                <input type="file" name="attachments" onChange={this.onFilesChange} required={false} multiple={true} accept="application/pdf, image/*" />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-4">
          </div>
          <div className="col-sm-8">
            <button id="contact_submit" className="btn btn-outline-primary btn-block" disabled={this.props.loading ? true : false}>
              {this.props.loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {' ' + I18n.t('pages.tickets.form.submit')}
            </button>

            {/* {
              this.props.loading &&
              <div className="text-center mt-3">
                <div className="spinner-border text-center" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            } */}
          </div>
        </div>
      </form >
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

function mapStateToProps(state) {
  const { attachments } = state.global
  const { loading, item } = state.tickets;
  return { loading, item, attachments }
}

const connectedApp = connect(mapStateToProps)(TicketForm);
export { connectedApp as TicketForm };