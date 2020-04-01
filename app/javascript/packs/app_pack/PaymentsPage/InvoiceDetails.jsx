import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NewLineToBr } from '../_components';

class InvoiceDetails extends React.Component {
  render() {
    const { invoice, user } = this.props
    return (
      <React.Fragment>
        {invoice &&
          <div className="vh-50">
            <iframe scrolling="yes" className="w-100 h-100" src={invoice.pdf_url} ></iframe>
          </div>
        }
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

const connectedForm = connect(mapStateToProps)(InvoiceDetails);
export { connectedForm as InvoiceDetails }; 