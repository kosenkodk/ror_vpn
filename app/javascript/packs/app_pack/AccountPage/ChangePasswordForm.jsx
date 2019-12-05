import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';

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
          <FlashMessages error={error && error} notice={notice && notice} />
          <div className="col">
            <div className="form-group row">
              <label htmlFor="password_old" className="col-sm-6 col-form-label">Old login password:</label>
              <input type="password" name="password_old" className="col-sm-6 form-control" id="password_old" value={password_old} onChange={this.handleChange} placeholder='Password' />
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-6 col-form-label">New login password:</label>
              <input type="password" name="password" className="col-sm-6 form-control" id="password" value={password} onChange={this.handleChange} placeholder='Password' />
            </div>
            <div className="form-group row">
              <label htmlFor="password_confirmation" className="col-sm-6 col-form-label">Confirm login password:</label>
              <input type="password" name="password_confirmation" className="col-sm-6 form-control" id="password_confirmation" value={password_confirmation} onChange={this.handleChange} placeholder='Confirm' />
            </div>
          </div>
        </div>
        <div className="modal-footer d-flex w-100">
          <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.close')}</button>

          <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            {' ' + I18n.t('buttons.save')}
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