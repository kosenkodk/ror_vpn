import React from 'react'
import { connect } from 'react-redux'
import { NavHashLink as Link } from 'react-router-hash-link'

import { I18n } from 'helpers'
import { InfoBlock } from '../_components/admin'
import { ModalPopupForm } from '../_components/ModalPopupForm'
import { accountActions, userActions, globalActions, alertActions } from '../_actions'
import { FormDataAsJsonFromEvent } from '../_helpers'
import icInfoSrc from 'images/admin/ic_warning.svg'
import PayPal from '../DashboardPage/PayPal'
import BankCard from '../DashboardPage/BankCard'

import icEditSrc from 'images/icons/ic_edit.svg'
import icTrashSrc from 'images/icons/ic_trash.svg'
import icLockSrc from 'images/icons/ic_lock.svg'
import icDownloadSrc from 'images/icons/ic_download.svg'

class PaymentsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: '' }
  }

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
  }

  addBankCard = (e) => {
    if (e) e.preventDefault()
    this.props.dispatch(globalActions.setModalShow('addPaymentMethod'))
    this.setState({ isForm: true })
    this.setState({ title: 'Credit/Debit Card' })
  }

  addPayPal = (e) => {
    if (e) e.preventDefault()
    this.setState({ isForm: false })
    this.setState({ title: 'PayPal' })
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
    this.props.dispatch(userActions.addPaymentMethod(this.state))
  }

  onSavePayPal = (e) => {
    e.preventDefault()
    this.props.dispatch(userActions.addPaymentMethod(this.state))
  }

  componentDidMount() {
    // this.props.dispatch(globalActions.getPaymentMethods())
    this.props.dispatch(userActions.getUser())
  }

  render() {
    const { payment_methods, user } = this.props
    return (
      <div className="container-fluid payments">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <h1 className="">{I18n.t('pages.payments.payment_methods.title')}</h1>
            <InfoBlock>
              If you wish to pay by credit card, you can add your card below. Learn about other payment options.
              <Link to="#" className="mt-1 text-blue"> Learn more</Link>
            </InfoBlock>

            <div className="">
              <button onClick={this.addBankCard} className="btn btn-pink mr-2">{I18n.t('pages.payments.payment_methods.add_bank_card')}</button>
              <button onClick={this.addPayPal} className="btn btn-pink">{I18n.t('pages.payments.payment_methods.add_paypal')}</button>
            </div>


            <table className="table">
              <thead>
                <tr>
                  <th className="font-weight-bold">Method</th>
                  <th className="font-weight-bold">Status</th>
                  <th className="font-weight-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(user && user.payment_methods && (user.payment_methods.length > 0)) ?
                  user.payment_methods.map(item =>
                    <tr key={`pm${item.id}`}>
                      <td>{item.title}</td>
                      <td></td>
                      <td className="text-right">
                        <img src={icEditSrc} className="img-fluid" />
                        <img src={icTrashSrc} className="img-fluid" />
                        <img src={icLockSrc} className="img-fluid" />
                      </td>
                    </tr>
                  ) :
                  <tr>
                    <td rowSpan="3">Payment methods are not found</td>
                  </tr>
                }
              </tbody>
            </table>

            {/* <InfoBlock optionalCssClasses="my-5">
              <div className="row">
                <img src={icInfoSrc} className="col-1 img-fluid" />
                <p className="col">
                  To settle your invoice(s) via Crypto or Qiwi, you need to manually trigger the pay button in “Invoices” section.
                </p>
              </div>
            </InfoBlock> */}


            <div className="invoices">
              <h1 className="">{I18n.t('pages.payments.invoices.title')}</h1>
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
              <BankCard onInputChange={this.onInputChange} />
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
  const { payment_methods } = state.global
  const { user } = state.users
  return {
    user, payment_methods
  }
}

const connectedPage = connect(mapStateToProps)(PaymentsPage)
export { connectedPage as PaymentsPage }