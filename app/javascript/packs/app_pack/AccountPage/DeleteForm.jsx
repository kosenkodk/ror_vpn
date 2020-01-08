import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';

class DeleteForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '' }
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email } = this.state;
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit} className="account-delete-form">
        <div className="modal-body">
          {/* <FlashMessages error={error && error} notice={notice && notice} /> */}

          <div className="border-left-pink mt-0">
            <h6 id="caveat-with-anchors">WARNING: DELETION IS PERMANENT</h6>
            <p className="mt-0 mb-2">If you wish to delete this account in order to combine it with another one, do NOT delete it.
            </p>
            <Link to="#" className="mt-1 text-blue">Learn more</Link>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {/* {I18n.t('pages.tickets.form.text')} */}
              Feedback
              </label>
            <div className="col-sm-6">
              <textarea type="text" id="message" name="message" className="form-control" defaultValue={this.props.text || ''} required={false} placeholder={I18n.t('pages.tickets.form.help.text')}></textarea>
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="email_contact">
              Email address
              {/* {I18n.t('pages.tickets.form.title')} */}
            </label>
            <div className="col-sm-6">
              <input type="hidden" name="id" value={this.props.id && this.props.id} />
              <input type="text" name="email_contact" required={false} className="form-control" defaultValue={email} placeholder='Email' onChange={this.handleChange} aria-describedby="email_contact" />
              <p className="form-text">Please provide an email address in case we need to contact you.</p>
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row align-items-center mb-0">
            <label htmlFor="password" className="col-sm-4 col-form-label">
              Login password</label>
            <div className="col-sm-6">
              <input type="password" name="password" className="form-control" id="password"
                // value={password_old} 
                onChange={this.handleChange} placeholder='Password'
              />
            </div>
            <div className="col-sm-2"></div>
          </div>

        </div>
        <div className="modal-footer">
          <div className="d-flex w-100">
            <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button>
            <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {' ' + I18n.t('buttons.delete')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

DeleteForm.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
  notice: PropTypes.string,
}

function mapStateToProps(state) {
  const { loading, error, notice } = state.account;
  return {
    loading,
    error,
    notice,
  };
}

const connectedForm = connect(mapStateToProps)(DeleteForm);
export { connectedForm as DeleteForm }; 