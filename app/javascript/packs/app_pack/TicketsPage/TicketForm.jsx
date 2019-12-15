import React from 'react';
import PropTypes from 'prop-types'
import { I18n } from 'helpers';
import SelectBoxDepartment from '../_components/SelectBoxDepartment';
import { connect } from 'react-redux';
import { ticketActions } from '../_actions';

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

        <div className="form-group row">
          <label htmlFor="ticketAttachment" className="col-sm-4 col-form-label">{I18n.t('pages.tickets.form.attachment')}</label>
          <div className="col-sm-8 align-self-center">
            <input id="ticketAttachment" type="file" name="attachment" onChange={this.props.onFileChange} value={this.state.file} required={false} className="form-control-file" placeholder={I18n.t('pages.tickets.form.help.attachment')} />
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-4">
            {I18n.t('pages.tickets.form.attachment')}
          </div>

          <div class="file col-sm-8">
            <label className=""> Select a file
              <input type="file" size="60" />
            </label>
          </div>
        </div>

        {/*
        <div className="form-group row">

          <div class="custom-file">
            <input type="file" class="custom-file-input" id="customFile" />
            <label class="custom-file-label" for="customFile">No file selected</label>
          </div>

          <div class="file-field">
            <div class="btn btn-outline-success btn-rounded waves-effect btn-sm float-left">
              <span>Choose file</span>
              <input type="file" />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" placeholder="Upload your file" />
            </div>
          </div>


          <div class="file">
            <label className=""> Select a file
              <input type="file" size="60" />
            </label>
          </div>


          <div class="input-group mb-3">
            <div class="file">
              <label className="btn btn-pink"> Select a file
              <input type="file" size="60" />
              </label>
            </div>
            <div className="input-group-append">
              <span className="input-group-text" id="inputGroupFileAddon02">Upload</span>
            </div>
          </div>
        </div>
        */}

        <div className="form-group row">
          <div className="col-sm-4">
          </div>
          <div className="col-sm-8">
            <br />

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