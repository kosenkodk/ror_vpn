import React from 'react'
import { connect } from 'react-redux'
import { NavHashLink as Link } from 'react-router-hash-link'

import { I18n } from 'helpers'
import { InfoBlock } from '../_components/admin'
import { ModalPopupForm } from '../_components/ModalPopupForm'
import { accountActions, globalActions, alertActions } from '../_actions'
import { FormDataAsJsonFromEvent } from '../_helpers'
import icInfoSrc from 'images/admin/ic_warning.svg'
import PayPal from '../DashboardPage/PayPal'
import BankCard from '../DashboardPage/BankCard'

class PaymentsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  addBankCard = (e) => {
    if (e) e.preventDefault()
    this.props.dispatch(globalActions.setModalShow('addPaymentMethod'))
    this.setState({ isForm: true })
  }

  addPayPal = (e) => {
    if (e) e.preventDefault()
    this.setState({ isForm: false })
    this.props.dispatch(globalActions.setModalShow('addPayPal'))
  }

  onModalClose = (e) => {
    if (e) e.preventDefault()
    this.props.dispatch(accountActions.clearAlerts())

    this.setState({ isForm: false })
    this.props.dispatch(globalActions.setModalShow(false))
  }

  onSaveBankCard = (e) => {
    e.preventDefault()
  }

  onSavePayPal = (e) => {
    e.preventDefault()
  }

  render() {
    const { user } = this.props
    return (
      <div className="container-fluid payments">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <h1>{I18n.t('pages.payments.payment_methods.title')}</h1>
            <InfoBlock>
              If you wish to pay by credit card, you can add your card below. Learn about other payment options.
              <Link to="#" className="mt-1 text-blue"> Learn more</Link>
            </InfoBlock>

            <div className=" ">
              <button onClick={this.addBankCard} className="btn btn-pink mr-2">{I18n.t('pages.payments.payment_methods.add_bank_card')}</button>
              <button onClick={this.addPayPal} className="btn btn-pink">{I18n.t('pages.payments.payment_methods.add_paypal')}</button>
            </div>

            <InfoBlock optionalCssClasses="my-5">
              <div className="row">
                <img src={icInfoSrc} className="col-1 img-fluid" />
                <p className="col">
                  To settle your invoice(s) via Crypto or Qiwi, you need to manually trigger the pay button in “Invoices” section.
                </p>
              </div>
            </InfoBlock>


            <div id="subscriptions" className="invoices">
              <h1>{I18n.t('pages.payments.invoices.title')}</h1>
              <InfoBlock>
                You can customize and download your invoices for accounting purposes.
              </InfoBlock>
            </div>

            <ModalPopupForm
              onClose={this.onModalClose}
              id='addPaymentMethod'
              isForm={false}
              isHideBtn={true}
              isNextBtnOnly={true}
              onBtnSave={this.onSaveBankCard}
              title={I18n.t('pages.payments.payment_methods.add_bank_card')}
              btnCloseText={I18n.t('buttons.cancel')}
              btnSaveText={I18n.t('buttons.next')}
              btnClasses={''}>
              <InfoBlock>
                Your current subscription: {(user && user.tariff_plan && user.tariff_plan.title)}
              </InfoBlock>
              <BankCard />
            </ModalPopupForm>

            <ModalPopupForm
              onClose={this.onModalClose}
              id='addPayPal'
              isForm={false}
              isHideBtn={true}
              isNextBtnOnly={true}
              onBtnSave={this.onSavePayPal}
              title={I18n.t('pages.payments.payment_methods.add_paypal')}
              btnCloseText={I18n.t('buttons.cancel')}
              btnSaveText={I18n.t('buttons.next')}
              btnClasses={''}>
              <PayPal item={{ title: 'PayPal' }} />
            </ModalPopupForm>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, user } = state.authentication
  return {
    loggingIn, user
  }
}

const connectedPage = connect(mapStateToProps)(PaymentsPage)
export { connectedPage as PaymentsPage }