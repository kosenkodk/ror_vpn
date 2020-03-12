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
      currentPaymentMethodId: 0, // || this.props.payment_methods && this.props.payment_methods[0].id
      currentPaymentMethod: '',
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
      const currentPaymentMethod = this.props.payment_methods.filter(item => item.id == e.target.value);
      this.setState({ currentPaymentMethodId: currentPaymentMethod[0].id });
      this.setState({ currentPaymentMethod: currentPaymentMethod[0] });
      return;
    }
    this.setState({ currentPaymentMethod: '' });
    this.setState({ currentPaymentMethodId: 0 });
    if (e) e.preventDefault();
  }

  render() {
    const { email, currentPaymentMethod, currentPaymentMethodId } = this.state;
    const { loading, error, notice, planSelected, countries } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit} className="dashboard-payment-details">
        <div className="modal-body">

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="amount_due">
              Amount due
            </label>
            <div className="col-sm-6">
              <input type="text" name="amount_due" aria-describedby="amount_due" required={false} className="form-control" defaultValue={`$${planSelected.price}`} placeholder='' />
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="email_contact">
              Payment method
              {/* {I18n.t('pages.tickets.form.title')} */}
            </label>
            <div className="col-sm-6">
              <select name="payment_methods" onChange={this.onPaymentMethodChange} value={currentPaymentMethodId} className="form-control">
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
          {(currentPaymentMethod.pay_id === 'bank_card') &&

            <React.Fragment>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label" htmlFor="full_name">
                  Full name
              </label>
                <div className="col-sm-6">
                  <input type="text" name="full_name" aria-describedby="full_name" required={true} className="form-control" placeholder='' onChange={this.handleChange} />
                </div>
                <div className="col-sm-2"></div>
              </div>

              <div className="form-group row">
                <label className="col-sm-4 col-form-label" htmlFor="card_no">
                  Card number
              </label>
                <div className="col-sm-6">
                  <input type="text" name="card_no" aria-describedby="card_no" required={true} className="form-control" placeholder='' onChange={this.handleChange} />
                </div>
                <div className="col-sm-2"></div>
              </div>

              <div className="form-group row">
                <label className="col-sm-4 col-form-label" htmlFor="card_details">
                  MM/YY / Security code
                </label>
                <div className="col-sm-3">
                  <input type="text" name="card_date" aria-describedby="card_details" required={true} className="form-control" placeholder='MM/YY' onChange={this.handleChange} />
                </div>
                <div className="col-sm-3">
                  <input type="text" name="card_code" aria-describedby="card_details" required={true} className="form-control" placeholder='Security code' onChange={this.handleChange} />
                </div>
                <div className="col-sm-2"></div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 col-form-label" htmlFor="state_details">
                  State
                </label>
                <div className="col-sm-3">
                  <select className="form-control" id="departmentSelectBox">
                    <option>Please select</option>
                    {countries && countries.map((item) =>
                      <option key={`${item.code}`} value={item.code}>{item.name}</option>
                    )}
                  </select>
                </div>
                <div className="col-sm-3">
                  <input type="text" name="zip_code" aria-describedby="state_details" required={true} className="form-control" placeholder='ZIP' onChange={this.handleChange} />
                </div>
                <div className="col-sm-2"></div>
              </div>
            </React.Fragment>
          }
          {(currentPaymentMethod.pay_id === 'paypal') &&
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                {currentPaymentMethod.title}
              </label>
              <div className="col-sm-6">
                <InfoBlock optionalCssClasses="my-0">
                  We will rediret you to PayPal in a new browser tab to complete this transaction. If you use any pop-up blockers, please disable them to continue.
                </InfoBlock>
                <button className="btn btn-pink my-3">Check out with PayPal</button>
                <InfoBlock optionalCssClasses="my-0">
                  You must have a credit card or bank account linked with your PayPal account. If your PayPal account. If your PayPal account doesn’t have that, please
                  <Link to="#" className="mt-1 text-blue"> click here.</Link>
                </InfoBlock>
              </div>
              <div className="col-sm-2"></div>
            </div>
          }
          {(currentPaymentMethod.pay_id === 'bitcoin') &&
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                {currentPaymentMethod.title}
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
          {(currentPaymentMethod.pay_id === 'paymentwall') &&
            <div className="form-group row">
              <label className="col-sm-4 col-form-label">
                {currentPaymentMethod.title}
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
  const { payment_methods, countries } = state.global;
  const { loading, error, notice } = state.account;
  return {
    countries,
    payment_methods,
    loading,
    error,
    notice,
  };
}

const connectedForm = connect(mapStateToProps)(PaymentDetailsCard);
export { connectedForm as PaymentDetailsCard }; 