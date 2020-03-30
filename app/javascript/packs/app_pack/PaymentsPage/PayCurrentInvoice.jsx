import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PaymentDetailsCard } from '../DashboardPage/PaymentDetailsCard';
import { alertActions } from '../_actions';
import { I18n } from 'helpers';

class PayCurrentInvoice extends React.Component {

  onPay = (e) => {
    e.preventDefault()
    this.props.dispatch(alertActions.success(I18n.t('pages.payments.invoices.pay_current_invoice.success')))
  }

  render() {
    const { invoice, user } = this.props
    return (
      <React.Fragment>
        {/* Invoice #: {invoice && invoice.no} */}
        <PaymentDetailsCard planSelected={user && user.tariff_plan} onFormSubmit={this.onPay} />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  // const { user } = state.account;
  // return {
  //   user
  // };
  return state
}

const connectedForm = connect(mapStateToProps)(PayCurrentInvoice);
export { connectedForm as PayCurrentInvoice }; 