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
    this.props.onPaymentMethodChange(this.props.paymentMethodId, this.card_number.value, this.holder_name.value, this.month.value, this.year.value, this.cvc.value)
  }

  render() {
    return (
      <div className="credit_card row p-sm-3 p-md-5 ml-auto mr-auto credit_card_bg">
        <div className="col-sm-8">
          <h5>{I18n.t('bank_card.info')}</h5>
          <label className="col-form-label">{I18n.t('bank_card.number')}</label>
        </div>

        <div className="col-sm-8">
          <input type="number" required={true} className="form-control"
            onChange={this.onChange} ref={(input) => { this.card_number = input }} placeholder={I18n.t('bank_card.help.number')} />
        </div>

        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-4">
              <label className="col-form-label">{I18n.t('bank_card.holder_name')}</label>
              <input type="text" required={false} className="form-control"
                onChange={this.onChange} ref={(input) => { this.holder_name = input }} placeholder={I18n.t('bank_card.help.holder_name')} />
            </div>
            <div className="col-sm-2">
              <label className="col-form-label">{I18n.t('bank_card.month')}</label>
              <input type="number" required={false} className="form-control"
                onChange={this.onChange} ref={(input) => { this.month = input }} placeholder={I18n.t('bank_card.help.month')} />
            </div>
            <div className="col-sm-2">
              <label className="col-form-label">{I18n.t('bank_card.year')}</label>
              <input type="number" required={false} className="form-control"
                onChange={this.onChange} ref={(input) => { this.year = input }} placeholder={I18n.t('bank_card.help.year')} />
            </div>
            <div className="cvc col-sm-3 ml-auto mb-5">
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