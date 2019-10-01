import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class PaymentMethodCreditCardForm extends React.Component {

  constructor(props) {
    super(props)
    this.card_number = React.createRef()
    this.holder_name = React.createRef()
    this.month = React.createRef()
    this.year = React.createRef()
    this.cvc = React.createRef()
    // this.state = {}
  }

  onChange = (e) => {
    this.props.onPaymentMethodChange(this.card_number.value, this.holder_name.value, this.month.value, this.year.value, this.cvc.value)
  }

  render() {
    return (
      <div className="row pt-sm-3 p-md-4 pt-md-5 bg_credit_card">
        <div className="col-sm-8">
          <h5>{I18n.t('bank_card.info')}</h5>
          <label className="col-form-label">{I18n.t('bank_card.number')}</label>
        </div>

        <div className="col-sm-8">
          <input type="number" required={true} className="form-control"
            onChange={this.onChange} ref={(input) => { this.card_number = input }} placeholder={I18n.t('bank_card.help.number')} />
        </div>

        <div className="col-sm-8 col-md-8">
          <div className="row">
            <div className="col-sm-6">
              <label className="col-form-label">{I18n.t('bank_card.holder_name')}</label>
              <input type="text" required={false} className="form-control"
                onChange={this.onChange} ref={(input) => { this.holder_name = input }} placeholder={I18n.t('bank_card.help.holder_name')} />
            </div>
            <div className="col-sm-3">
              <label className="col-form-label">{I18n.t('bank_card.month')}</label>
              <input type="number" required={false} className="form-control"
                onChange={this.onChange} ref={(input) => { this.month = input }} placeholder={I18n.t('bank_card.help.month')} />
            </div>
            <div className="col-sm-3">
              <label className="col-form-label">{I18n.t('bank_card.year')}</label>
              <input type="number" required={false} className="form-control"
                onChange={this.onChange} ref={(input) => { this.year = input }} placeholder={I18n.t('bank_card.help.year')} />
            </div>
          </div>
        </div>

        <div className="col-sm-12">
          <div className="row">
            <div className="col"></div>
            <div className="col-sm-3 col-md-3 col-lg-3 text-black-50 ml-md-auto mr-sm-4 mr-md-0 mt-sm-n5 pb-sm-4 mb-md-5 mt-lg-n2 mb-lg-5">
              <label className="col-form-label">{I18n.t('bank_card.cvvcvc')}</label>
              <input type="password" required={false} className="form-control"
                onChange={this.onChange} ref={(input) => { this.cvc = input }} placeholder={I18n.t('bank_card.help.cvc')} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentMethodCreditCardForm;