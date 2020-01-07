import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';
import { SelectBox } from '../_components';
import { globalActions } from '../_actions';

class CancelAccountForm extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    if (this.props.account_cancellation_reasons && this.props.account_cancellation_reasons.length > 0) return;
    this.props.dispatch(globalActions.getAccountCancellationReasons());
  }

  render() {
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit} className="account-cancel-form">
        <div className="modal-body">
          <FlashMessages error={error && error} notice={notice && notice} />

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="cancel_account_select_box">
              {I18n.t('pages.account.cancel.form.select_reason')}
            </label>
            <div className="col-sm-6">
              <SelectBox id="cancel_account_select_box" name="cancel_account_reason_id"
                items={this.props.account_cancellation_reasons && this.props.account_cancellation_reasons}
              />
            </div>
            <div className="col-sm-2"></div>
          </div>

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

CancelAccountForm.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
  notice: PropTypes.string,
  account_cancellation_reasons: PropTypes.array
}

function mapStateToProps(state) {
  const { account_cancellation_reasons } = state.global
  const { loading, error, notice } = state.account;
  return {
    loading,
    error,
    notice,
    account_cancellation_reasons
  };
}

const connectedForm = connect(mapStateToProps)(CancelAccountForm);
export { connectedForm as CancelAccountForm }; 