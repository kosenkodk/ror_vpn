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
      <div class="row">
        <div class="col-xs-12">
          <table class="table text-white mt-5">
            <tbody>
              <tr>
                <td class="text-left">Plan for 1 year</td>
                <td></td>
                <td class="text-right">268.80 $</td>
              </tr>
              <tr>
                <td class="text-left">Discount -66%</td>
                <td></td>
                <td class="text-right">-191.05 $</td>
              </tr>
              <tr>
                <td class="text-left">VAT 0% - USA
            <select class="form-control col-xs-12 col-sm-6 col-md-4" id="exampleFormControlSelect1">
                    <option>USA</option>
                  </select>
                </td>
                <td></td>
                <td class="text-right">0.00 $</td>
              </tr>
              <tr class="font-weight-bold">
                <td class="text-left">Total</td>
                <td></td>
                <td class="text-right">USD 95.75 $</td>
              </tr>
            </tbody>
          </table>

          <p class="text-left">By submitting this form, you agree to our <a href="#">Terms</a> and
          <a href="#"> Privacy Policy </a>.
                                  If you do not want to receive information about VPN services, please send an email to
      <a href="mailto:privacy@vega.com">privacy@vega.com</a>.
    </p>
        </div>

        <div class="col-md-4 offset-md-4">
          <button className="btn btn-outline-primary btn-block">{I18n.t('buttons.continue')}</button>
          {/* <%= f.submit t('buttons.continue'), {class:'btn btn-outline-primary btn-block'} %> */}
        </div>
      </div>
    )
  }
}

export default PaymentMethodDetails