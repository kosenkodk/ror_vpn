import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NewLineToBr } from '../_components';
import { InvoiceDetails } from './InvoiceDetails'

class PayCurrentInvoice extends React.Component {

  render() {
    const { invoice, user } = this.props
    return (
      <React.Fragment>
        <InvoiceDetails invoice={invoice} />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { error, notice, user } = state.account;
  return {
    error,
    notice,
    user
  };
}

const connectedForm = connect(mapStateToProps)(PayCurrentInvoice);
export { connectedForm as PayCurrentInvoice }; 