import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';

class ChangeEmailForm extends React.Component {

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
      <form onSubmit={this.props.onFormSubmit}>
        <div className="modal-body">
          <FlashMessages error={error && error} notice={notice && notice} />
          <div className="col">
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-6 col-form-label">Email login:</label>
              <input type="string" name="email" className="col-sm-6 form-control" id="email" value={email} onChange={this.handleChange} placeholder='Email' />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-pink-dark" data-dismiss="modal">{I18n.t('buttons.close')}</button>
          <br />
          <button type="submit" className="btn btn-outline-pink active" disabled={loading ? true : false}>
            {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
            {' ' + I18n.t('buttons.save')}
          </button>
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