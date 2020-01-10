import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
// import FlashMessages from '../_sections/FlashMessages';

class Setup2faStep3Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = { code: '', password: '' }
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { code, password } = this.state;
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit}>
        <div className="modal-body">
          {/* <FlashMessages error={error && error} notice={notice && notice} /> */}
          <div className="form-group row align-items-center">
            <label htmlFor="password" className="col-sm-4 col-form-label">Password</label>
            <input type="password" name="password" className="col-sm-6 form-control" id="password" value={password} onChange={this.handleChange} placeholder='Password' />
          </div>
          <div className="form-group row align-items-center">
            <label htmlFor="code" className="col-sm-4 col-form-label">Two-factor code</label>
            <input type="password" name="code2fa" className="col-sm-6 form-control" id="code2fa" value={code} onChange={this.handleChange} placeholder='Two-factor code' />
          </div>
        </div>
        <div className="modal-footer">
          <div className="d-flex w-100">
            <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">
              {I18n.t('buttons.back')}
            </button>
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

Setup2faStep3Form.propTypes = {
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

const connectedForm = connect(mapStateToProps)(Setup2faStep3Form);
export { connectedForm as Setup2faStep3Form }; 