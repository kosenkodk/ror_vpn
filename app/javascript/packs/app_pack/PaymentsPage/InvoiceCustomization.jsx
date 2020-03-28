import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';

class InvoiceCustomization extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit} className="account-cancel-form">
        <div className="modal-body">

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {I18n.t('pages.account.cancel.form.message')}
            </label>
            <div className="col-sm-6">
              <textarea type="text" id="invoice_details" name="invoice_details" className="form-control" defaultValue={this.props.text || ''} required={false}
              // placeholder={I18n.t('pages.account.cancel.form.message')}
              ></textarea>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>

        {/* <div className="modal-footer">
          <div className="d-flex w-100">
            <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button>
            <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {' ' + I18n.t('buttons.submit')}
            </button>
          </div>
        </div> */}
      </form>
    );
  }
}

InvoiceCustomization.propTypes = {
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

const connectedForm = connect(mapStateToProps)(InvoiceCustomization);
export { connectedForm as InvoiceCustomization }; 