import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import { InfoBlock } from '../_components/admin';
import { globalActions } from '../_actions';

class PaymentDetailsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      currentPaymentMethod: 1 // || this.props.payment_methods && this.props.payment_methods[0].id
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    this.props.dispatch(globalActions.getPaymentMethods());
  }

  onPaymentMethodChange = (e) => {
    const currentPaymentMethod = this.props.payment_methods.filter(item => item.id == e.target.value)
    this.setState({ currentPaymentMethod: currentPaymentMethod[0] })
    e.preventDefault();
  }

  render() {
    const { email, currentPaymentMethod } = this.state;
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit} className="account-delete-form">
        <div className="modal-body">

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {/* {I18n.t('pages.tickets.form.text')} */}
              Amount due
              </label>
            <div className="col-sm-6">
              <input type="text" id="message" name="message" className="form-control" defaultValue={this.props.text || ''} required={false} placeholder={I18n.t('pages.tickets.form.help.text')} />
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="email_contact">
              Payment method
              {/* {I18n.t('pages.tickets.form.title')} */}
            </label>
            <div className="col-sm-6">
              <select name="payment_methods" onChange={this.onPaymentMethodChange} value={this.state.currentPaymentMethod.id} className="form-control">
                {this.props.payment_methods && this.props.payment_methods.map((item) =>
                  <option key={`payment_method${item.id}`} value={item.id}>{item.title}</option>
                )}
              </select>
              {/* <input type="hidden" name="id" value={this.props.id && this.props.id} />
              <input type="text" name="email_contact" required={false} className="form-control" defaultValue={email} placeholder='Email' onChange={this.handleChange} aria-describedby="email_contact" />
              <p className="form-text">Please provide an email address in case we need to contact you.</p> */}
            </div>
            <div className="col-sm-2"></div>
          </div>
          {/* {currentPaymentMethod.title} */}
          {(currentPaymentMethod.id === 1) &&
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                {currentPaymentMethod.title}
              </label>
              <div className="col-sm-6">
                <textarea readOnly type="text" id="cancel_account_reason_text" name="cancel_account_reason_text" className="form-control" defaultValue={this.props.text || ''} required={false}
                // placeholder={I18n.t('pages.account.cancel.form.message')}
                ></textarea>
              </div>
              <div className="col-sm-2"></div>
            </div>
          }
          {(currentPaymentMethod.id === 2) &&
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                {currentPaymentMethod.title}
              </label>
              <div className="col-sm-6">
                <textarea readOnly type="text" id="cancel_account_reason_text" name="cancel_account_reason_text" className="form-control" defaultValue={this.props.text || ''} required={false}
                // placeholder={I18n.t('pages.account.cancel.form.message')}
                ></textarea>
              </div>
              <div className="col-sm-2"></div>
            </div>
          }
          {(currentPaymentMethod.id === 3) &&
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                {currentPaymentMethod.title}
              </label>
              <div className="col-sm-6">
                <textarea readOnly type="text" id="cancel_account_reason_text" name="cancel_account_reason_text" className="form-control" defaultValue={this.props.text || ''} required={false}
                // placeholder={I18n.t('pages.account.cancel.form.message')}
                ></textarea>
              </div>
              <div className="col-sm-2"></div>
            </div>
          }
        </div>
        <div className="modal-footer">
          <div className="d-flex w-100 justify-content-center">
            {/* <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button> */}
            <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {' ' + I18n.t('buttons.next')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

PaymentDetailsCard.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
  notice: PropTypes.string,
}

function mapStateToProps(state) {
  const { payment_methods } = state.global;
  const { loading, error, notice } = state.account;
  return {
    payment_methods,
    loading,
    error,
    notice,
  };
}

const connectedForm = connect(mapStateToProps)(PaymentDetailsCard);
export { connectedForm as PaymentDetailsCard }; 