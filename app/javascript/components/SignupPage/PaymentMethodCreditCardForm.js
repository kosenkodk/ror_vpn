import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class PaymentMethodCreditCardForm extends React.Component {

  constructor(props) {
    super(props)
    this.email = React.createRef()
    this.holder_name = React.createRef()
    this.month = React.createRef()
    this.year = React.createRef()
    this.cvc = React.createRef()
    // this.state = {}
  }

  render() {
    return (
      <div className="row p-2 p-md-5 bg_credit_card">
        <div className="col-sm-8">
          <h5>{I18n.t('bank_card.info')}</h5>
          <label className="col-form-label">{I18n.t('bank_card.number')}</label>
        </div>
        <div className="col-sm-2"></div>

        <div className="col-sm-8">
          <input type="email" required={true} className="form-control" ref={(input) => { this.email = input }} placeholder={I18n.t('bank_card.help.number')} />
        </div>
        <div className="col-sm-2"></div>

        <div className="col-sm-12">
          <label className="col-form-label">{I18n.t('bank_card.holder_name')}</label>
        </div>
        <div className="col-sm-4">
          <input type="text" required={false} className="form-control" ref={(input) => { this.holder_name = input }} placeholder={I18n.t('bank_card.help.holder_name')} />
        </div>

        <div className="col-sm-2">
          <input type="text" required={false} className="form-control" ref={(input) => { this.month = input }} placeholder={I18n.t('bank_card.help.month')} />
        </div>

        <div className="col-sm-2">
          <input type="text" required={false} className="form-control" ref={(input) => { this.year = input }} placeholder={I18n.t('bank_card.help.year')} />
        </div>

        <div className="col-sm-4 text-black-50 pl-5 pr-1">
          <label className="col-form-label">{I18n.t('bank_card.cvc')}</label>
          <input type="text" required={false} className="form-control" ref={(input) => { this.cvc = input }} placeholder={I18n.t('bank_card.help.cvc')} />
        </div>
      </div>
    )
  }
}

export default PaymentMethodCreditCardForm;