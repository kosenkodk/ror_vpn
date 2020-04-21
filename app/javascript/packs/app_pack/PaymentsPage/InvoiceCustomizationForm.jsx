import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import { invoiceActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';

class InvoiceCustomizationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { invoice_details: '' };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const data = FormDataAsJsonFromEvent(e);
    data['id'] = this.props.id
    this.props.dispatch(invoiceActions.addDetailsToInvoices(data));
  }

  render() {
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.onFormSubmit} className="account-cancel-form">
        <div className="modal-body">

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {I18n.t('pages.account.cancel.form.message')}
            </label>
            <div className="col-sm-6">
              <textarea type="text" id="invoice_details" name="invoice_details" className="form-control" value={this.state.invoice_details || ''} onChange={this.handleChange} required={true}
              // placeholder={I18n.t('pages.account.cancel.form.message')}
              ></textarea>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="col-sm-4">
          </div>
          <div className="col-sm-6 mr-auto pl-0">
            {/* <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button> */}
            <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {' ' + I18n.t('buttons.save')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

InvoiceCustomizationForm.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
  notice: PropTypes.string,
}

function mapStateToProps(state) {
  const { loading } = state.invoices
  const { error, notice } = state.account;
  return {
    loading,
    error,
    notice,
  };
}

const connectedForm = connect(mapStateToProps)(InvoiceCustomizationForm);
export { connectedForm as InvoiceCustomizationForm }; 