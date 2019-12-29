import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';

class ChangeEmailForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
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
      <form onSubmit={this.props.onFormSubmit}>
        <div className="modal-body">
          <FlashMessages error={error && error} notice={notice && notice} />
          <div className="form-group row align-items-center">
            <label htmlFor="email" className="col-sm-4 col-form-label">Email login:</label>
            <input type="string" name="email" className="col-sm-6 form-control" id="email" value={email} onChange={this.handleChange} placeholder='Email' />
          </div>
          <div className="form-group row align-items-center mb-0">
            <label htmlFor="password" className="col-sm-4 col-form-label">
              Login password</label>
            <div className="col-sm-6 form-control">
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
              {' ' + I18n.t('buttons.submit')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ChangeEmailForm.propTypes = {
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

const connectedForm = connect(mapStateToProps)(ChangeEmailForm);
export { connectedForm as ChangeEmailForm }; 