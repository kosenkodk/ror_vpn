import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class PaymentMethodDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let { item } = this.props
    return (
      <div className="row m-1">
        <div className="col-xs-12">
          <table className="table text-white mt-5">
            <tbody>
              <tr>
                <td className="text-left">Plan for 1 year</td>
                <td></td>
                <td className="text-right">268.80 $</td>
              </tr>
              <tr>
                <td className="text-left">Discount -66%</td>
                <td></td>
                <td className="text-right">-191.05 $</td>
              </tr>
              <tr>
                <td className="text-left">VAT 0% - USA
                  <select className="form-control col-xs-12 col-sm-6 col-md-4" id={`countryControlSelect${item.id}`}>
                    <option>USA</option>
                  </select>
                </td>
                <td></td>
                <td className="text-right">0.00 $</td>
              </tr>
              <tr className="font-weight-bold">
                <td className="text-left">Total</td>
                <td></td>
                <td className="text-right">USD 95.75 $</td>
              </tr>
            </tbody>
          </table>

          <p className="text-left">By submitting this form, you agree to our <a href="#">Terms</a> and
            <a href="#"> Privacy Policy </a>.
                                          If you do not want to receive information about VPN services, please send an email to
            <a href="mailto:privacy@vega.com">privacy@vega.com</a>.
          </p>
        </div>

        <div className="col-md-4 offset-md-4">
          <button onClick={(e) => { this.props.onFormSubmit(e) }} className="btn btn-outline-primary btn-block">{I18n.t('buttons.continue')}</button>
          {/* <%= f.submit t('buttons.continue'), {class:'btn btn-outline-primary btn-block'} %> */}
        </div>
      </div>
    )
  }
}

export default PaymentMethodDetails