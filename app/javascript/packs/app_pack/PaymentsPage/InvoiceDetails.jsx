import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import icDownloadSrc from 'images/icons/ic_download.svg';
import icOpenInNewTabSrc from 'images/icons/ic_open_in_new_tab.svg';
import { InvoiceDetailsHtml } from './InvoiceDetailsHtml';

class InvoiceDetails extends React.Component {


  onDownloadInvoice = (e, invoice) => {
    e.preventDefault()
    // window.open(invoice.pdf_url, '_blank') // open in a new tab
    window.open(invoice.pdf_url) // open in a new tab
    // window.location.href = invoice.pdf_url; // open in the current page
  }

  render() {
    const { invoice, user } = this.props
    return (
      <React.Fragment>
        {invoice &&
          <React.Fragment>
            {invoice.pdf_url ?
              <div className="vh-50">
                <iframe scrolling="yes" className="w-100 h-100" src={invoice.pdf_url} ></iframe>
              </div>
              :
              <InvoiceDetailsHtml invoice={invoice} />
            }
            {/* <div className="row justify-content-center align-items-center"> */}
            <div className="row text-center mt-10">
              <div className="col">
                {invoice.created_at_humanize} - {(invoice.pdf_size > 0) && `${invoice.pdf_size / 1000} KB`}
              </div>
              <div className="col">
                <a href={invoice.pdf_url} target="_blank">
                  <img src={icOpenInNewTabSrc} className="img-fluid" />
                &nbsp;
                Open in new tab
              </a>
              </div>
              <div className="col">
                <a className="px-1"
                  // href="#" onClick={(e) => this.onDownloadInvoice(e, invoice)} 
                  href={invoice.pdf_url} target="_blank" download
                >
                  <img src={icDownloadSrc} className="img-fluid" />
                &nbsp;
                Download
              </a>
              </div>
            </div>
          </React.Fragment>
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