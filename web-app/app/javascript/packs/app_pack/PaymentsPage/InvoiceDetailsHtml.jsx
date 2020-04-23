import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NewLineToBr } from '../_components';

class InvoiceDetailsHtml extends React.Component {
  render() {
    const { invoice, user } = this.props
    return (
      <React.Fragment>
        {invoice &&
          <div>
            <div className="row">
              <div className="col-4 offset-4 text-center">
                Vega VPN <br />
              123 Grienfield Drive<br />
              Yardville, NM 49990<br />
              (555) 555-0198<br />
              sale@vega.com<br />
              </div>
            </div>
            <div className="row mt-30">
              <div className="col">
                <NewLineToBr>{invoice.details_from}</NewLineToBr>
              </div>
              <div className="col">
                Invoice #: {invoice.no}<br />
                Date: {invoice.created_at_humanize}<br />
              </div>
            </div>

            <table className="table mt-30">
              <thead>
                <tr>
                  <th className="font-weight-bold">Services</th>
                  <th className="font-weight-bold">Date</th>
                  <th className="font-weight-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice ?
                  <React.Fragment>
                    <tr key={`invoice${invoice.id}`}>
                      <td>
                        {invoice.title}
                        {/* {user && user.tariff_plan && user.tariff_plan.title} */}
                      </td>
                      <td>{invoice.created_at_humanize}</td>
                      <td>{invoice.currency}{invoice.amount}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="font-weight-bold">Total</td>
                      <td className="font-weight-bold">{invoice.currency}{invoice.amount}</td>
                    </tr>
                  </React.Fragment>
                  :
                  <tr>
                    <td rowSpan="6">Services are not found</td>
                  </tr>
                }
              </tbody>
            </table>
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

const connectedForm = connect(mapStateToProps)(InvoiceDetailsHtml);
export { connectedForm as InvoiceDetailsHtml }; 