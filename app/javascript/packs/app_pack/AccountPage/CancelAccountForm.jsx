import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';
import { SelectBox } from '../_components';
import { accountActions } from '../_actions';

class CancelAccountForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      cancelAccountReasons: []
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  UNSAFE_componentWillUpdate() {
    // this.props.dispatch(accountActions.getCancelAccountReasons());
  }

  // componentDidUpdate() {}

  componentDidMount() {
    try {
      const itemsFromLocalStorage = JSON.parse(localStorage.getItem('cancel_account_reasons'))
      this.setState({ cancelAccountReasons: itemsFromLocalStorage });
    } catch (e) {
      // console.log(e);
    }
    // if (this.state.cancelAccountReasons.length > 0) return;

    this.props.dispatch(accountActions.getCancelAccountReasons());
  }

  render() {
    const { email } = this.state;
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit} className="account-delete-form">
        <div className="modal-body">
          <FlashMessages error={error && error} notice={notice && notice} />

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {I18n.t('pages.account.cancel.form.message')}
            </label>
            <div className="col-sm-6">
              <textarea type="text" id="cancel_account_reason_text" name="cancel_account_reason_text" className="form-control" defaultValue={this.props.text || ''} required={false}
              // placeholder={I18n.t('pages.account.cancel.form.message')}
              ></textarea>
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="email_contact">
              {I18n.t('pages.account.cancel.form.select_reason')}
            </label>
            <div className="col-sm-6">
              <SelectBox id="cancel_account_select_box" name="cancel_account_reason_text" items={this.props.cancel_account_reasons || this.state.cancelAccountReasons} />
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="d-flex w-100">
            <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button>
            <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {/* {' ' + I18n.t('pages.account.cancel.form.button')} */}
              {' ' + I18n.t('buttons.submit')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

CancelAccountForm.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
  notice: PropTypes.string,
  cancel_account_reasons: PropTypes.array
}

function mapStateToProps(state) {
  const { loading, error, notice, cancel_account_reasons } = state.account;
  return {
    loading,
    error,
    notice,
    cancel_account_reasons
  };
}

const connectedForm = connect(mapStateToProps)(CancelAccountForm);
export { connectedForm as CancelAccountForm }; 