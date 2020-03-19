import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import { InfoBlock } from '../_components/admin';
import { globalActions, alertActions } from '../_actions';
import PayPal from './PayPal';
import BankCard from './BankCard';

class PaymentDetailsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      countryCode: 'US',
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    this.props.dispatch(globalActions.getPaymentMethods());
    // this.props.dispatch(globalActions.getCountries());
  }

  onPaymentMethodChange = (e) => {
    if (e && e.target.value > 0) {
      e.preventDefault();
      const currentPaymentMethod = this.props.payment_methods.filter(item => item.id == e.target.value);
      this.props.dispatch(globalActions.setPaymentMethod(currentPaymentMethod[0]));

      if (currentPaymentMethod[0].pay_id === 'bank_card')
        this.props.dispatch(globalActions.getCountries());
    }
  }

  onFormSubmit = (e) => {
    if (this.props.currentPaymentMethod)
      this.props.onFormSubmit(e);
    else
      this.props.dispatch(alertActions.error('Please chose a payment method first'));
    e.preventDefault();
  }

  render() {
    const { email, countryCode } = this.state;
    const { currentPaymentMethod, loading, error, notice, planSelected, countries } = this.props;
    return (
      <form onSubmit={this.onFormSubmit} className="dashboard-payment-details">
        <div className="modal-body">
          <input type="hidden" name="plan_id" value={planSelected && planSelected.id} />
          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="amount_due">
              Amount due
            </label>
            <div className="col-sm-6">
              <input type="text" name="amount_due" aria-describedby="amount_due" required={false} className="form-control" defaultValue={`$${planSelected && planSelected.price}`} placeholder='' />
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="email_contact">
              Payment method
              {/* {I18n.t('pages.tickets.form.title')} */}
            </label>
            <div className="col-sm-6">
              <select id="payment_methods" name="payment_methods" onChange={this.onPaymentMethodChange} value={(currentPaymentMethod && currentPaymentMethod.id) || ''} className="form-control">
                <option value={0}>Please select</option>
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
          {(currentPaymentMethod && currentPaymentMethod.pay_id === 'bank_card') &&
            <BankCard countries={countries} />
          }
          {(currentPaymentMethod && currentPaymentMethod.pay_id === 'paypal') &&
            <PayPal item={currentPaymentMethod} />
          }
          {(currentPaymentMethod && currentPaymentMethod.pay_id === 'bitcoin') &&
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                {currentPaymentMethod && currentPaymentMethod.title}
              </label>
              <div className="col-sm-6">
                <InfoBlock optionalCssClasses="my-0">
                  After making your Bitcoin payment, please follow the instructions below to upgrade.
                  <p className="mt-1 mb-0">
                    <Link to="#" className="mt-1 text-blue"> Learn more</Link>
                  </p>
                </InfoBlock>
              </div>
              <div className="col-sm-2"></div>
            </div>
          }
          {(currentPaymentMethod && currentPaymentMethod.pay_id === 'paymentwall') &&
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                {currentPaymentMethod && currentPaymentMethod.title}
              </label>
              <div className="col-sm-6">
                <div className="row">
                  {currentPaymentMethod.icon_urls && currentPaymentMethod.icon_urls.map((icon_url, index) =>
                    <img key={`pw-key${index}`} src={icon_url} className="img-fluid col-3 px-1 py-1" />
                  )}
                </div>
              </div>
              <div className="col-sm-2"></div>
            </div>
          }
        </div>
        <div className="modal-footer">
          <div className="d-flex w-100 justify-content-center">
            {/* <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button> */}
            <button type="submit" className="btn btn-pink btn-next-only" disabled={loading ? true : false}>
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
  const { payment_methods, countries, currentPaymentMethod } = state.global;
  const { loading, error, notice } = state.account;
  return {
    countries,
    payment_methods,
    loading,
    error,
    notice,
    currentPaymentMethod,
  };
}

const connectedForm = connect(mapStateToProps)(PaymentDetailsCard);
export { connectedForm as PaymentDetailsCard }; 