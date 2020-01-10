import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
// import FlashMessages from '../_sections/FlashMessages';

class ChangePasswordForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password_old: '',
      password: '',
      password_confirmation: '',
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { password_old, password, password_confirmation } = this.state;
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit}>
        <div className="modal-body">

          <div className="border-left-pink  mt-0 col">
            {/* <h5 id="caveat-with-anchors">WARNING: DELETION IS PERMANENT</h5> */}
            <p className="mt-1">
              Do NOT forget this password. If you forget it, you will not be able to login or decrypt your message.
            </p>
            <p>
              Save your password somewhere safe. Click on the icon to confirm you that have typed your password correctly.
            </p>
            <p className="mb-1">
              We recommend adding a recovery email address first. Otherwise, you cannot recover your account if something goes wrong.
            </p>
          </div>

          {/* <FlashMessages error={error && error} notice={notice && notice} /> */}

          <div className="col">
            <div className="form-group row align-items-center">
              <label htmlFor="password_old" className="col-sm-4 col-form-label">{I18n.t('pages.account.change_password.password_old')}</label>
              <input type="password" name="password_old" className="col-sm-6 form-control" id="password_old" value={password_old} onChange={this.handleChange} placeholder='Password' />
              <div className="col"></div>
            </div>
            <div className="form-group row align-items-center">
              <label htmlFor="password" className="col-sm-4 col-form-label">{I18n.t('pages.account.change_password.password_new')}</label>
              <input type="password" name="password" className="col-sm-6 form-control" id="password" value={password} onChange={this.handleChange} placeholder='Password' />
            </div>
            <div className="form-group row align-items-center">
              <label htmlFor="password_confirmation" className="col-sm-4 col-form-label">{I18n.t('pages.account.change_password.password_confirm')}</label>
              <input type="password" name="password_confirmation" className="col-sm-6 form-control" id="password_confirmation" value={password_confirmation} onChange={this.handleChange} placeholder='Confirm' />
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex w-100">
          <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button>

          <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            {' ' + I18n.t('buttons.submit')}
          </button>
        </div>
      </form>
    );
  }
}

ChangePasswordForm.propTypes = {
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

const connectedForm = connect(mapStateToProps)(ChangePasswordForm);
export { connectedForm as ChangePasswordForm }; 