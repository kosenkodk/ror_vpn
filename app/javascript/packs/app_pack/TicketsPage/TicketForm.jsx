import React from 'react';
import PropTypes from 'prop-types'
import { I18n } from 'helpers';
import SelectBoxDepartment from '../_components/SelectBoxDepartment';
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';
// import { MultiFileUpload } from '../_components/admin';
import { AttachmentPreview, AttachmentPreviewCard } from '../_components/admin';

class TicketForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      files: [],
      imagePreviews: []
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.onFilesChange = this.onFilesChange.bind(this);
  }

  onFileChange(e) {
    e.preventDefault();
    // if (e.target && e.target.files && e.target.files.length > 0)
    this.setState({ file: e.target.files[0] });
  }

  onFilesChange(e) {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const imagePreviews = [...e.target.files].map((item, index) => {
        return { file: item, url: URL.createObjectURL(item) };
      });
      this.setState({ imagePreviews: imagePreviews })
    }
    this.props.onFilesChange(e);
  }

  onTicketClose(e, id) {
    this.props.dispatch(ticketActions.update(id));
    e.preventDefault();
  }

  render() {
    // console.log('state files', this.state.files);
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
            <textarea type="text" name="text" className="form-control" defaultValue={this.props.text || ''} required={false} rows="6" placeholder={I18n.t('pages.tickets.form.help.text')}></textarea>
          </div>
        </div>

        {/* default file input */}
        {/* <div className="form-group row">
          <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
          <div className="col-sm-8 align-self-center">
            <input id="ticketAttachment" type="file" name="attachment" onChange={this.props.onFileChange} value={this.state.file} required={false} className="form-control-file" placeholder={I18n.t('pages.tickets.form.help.attachment')} />
          </div>
        </div> */}

        {/* custom file input - single file upload */}
        {/* <div className="form-group row">
          <div className="col-sm-4">
            <label className="col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
          </div>

          <div className="file col-sm-8">
            <div className="upload-btn-wrapper">
              <button className="btn">Select a file</button>
              <input type="file" name="attachment" onChange={this.props.onFileChange} value={this.state.file || ''} required={false} />
            </div>
          </div>
        </div> */}

        {/* custom file input - multi file upload with images preview */}
        <div className="form-group row">
          <div className="col-sm-4">
            <label className="col-form-label">{I18n.t('pages.tickets.form.attachments')}</label>
          </div>

          <div className="file col-sm-8">
            <div className="upload-btn-wrapper">
              <button className="btn">Select files</button>
              <input type="file" name="attachments" onChange={this.onFilesChange} required={false} multiple={true} accept="application/pdf, image/*" />
            </div>
          </div>
        </div>

        {/* <AttachmentPreviewCard items={this.state.imagePreviews} /> */}
        <AttachmentPreview items={this.state.imagePreviews} />
        {/* end custom file input - multi file upload with images preview */}

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

function mapStateToProps(state) {
  const { loading, item } = state.tickets;
  return { loading, item }
}

const connectedApp = connect(mapStateToProps)(TicketForm);
export { connectedApp as TicketForm };