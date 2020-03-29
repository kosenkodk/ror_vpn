import React from 'react'
import { connect } from 'react-redux'
import { NavHashLink as Link } from 'react-router-hash-link'

import { I18n } from 'helpers'
import { InfoBlock } from '../_components/admin'
import { ModalPopupForm } from '../_components/ModalPopupForm'
import { invoiceActions, accountActions, userActions, globalActions, alertActions } from '../_actions'
import { FormDataAsJsonFromEvent } from '../_helpers'
import icInfoSrc from 'images/admin/ic_warning.svg'
import PayPal from '../DashboardPage/PayPal'
import BankCardForm from '../DashboardPage/BankCardForm'
import { InvoiceCustomizationForm } from './InvoiceCustomizationForm'

import icEditSrc from 'images/icons/ic_edit.svg'
import icTrashSrc from 'images/icons/ic_trash.svg'
import icLockSrc from 'images/icons/ic_lock.svg'
import icDownloadSrc from 'images/icons/ic_download.svg'
import icViewSrc from 'images/icons/ic_view.svg'

class PaymentsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { title: '', selectedPaymentMethodId: 0 }
  }

  payCurrentInvoice() {

  }

  onShowCustomizeInvoices = (e) => {
    e.preventDefault()
    this.props.dispatch(globalActions.setModalShow('customizeInvoices'))
  }

  onCustomizeInvoices = (e) => {
    e.preventDefault()

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

  onSaveBankCard = (e, isValidForm) => {
    e.preventDefault()
    const data = FormDataAsJsonFromEvent(e);
    data['title'] = this.state.title
    if (isValidForm)
      this.props.dispatch(userActions.addPaymentMethod(data))
    else
      this.props.dispatch(alertActions.error(I18n.t('bank_card.errors.invalid_form')));
  }

  onSavePayPal = (e) => {
    e.preventDefault()
    this.props.dispatch(userActions.addPaymentMethod(this.state))
  }

  onDeletePaymentMethod = (e, id) => {
    if (e) e.preventDefault()
    this.setState({ selectedPaymentMethodId: id })
    this.props.dispatch(globalActions.setModalShow('deletePaymentMethod'))
  }

  deletePaymentMethod = (e) => {
    e.preventDefault()
    this.props.dispatch(userActions.deletePaymentMethodById(this.state.selectedPaymentMethodId))
  }

  componentDidMount() {
    // this.props.dispatch(globalActions.getPaymentMethods())
    this.props.dispatch(userActions.getUser())
    this.props.dispatch(globalActions.getCountries())
    this.props.dispatch(invoiceActions.getAll())
  }

  render() {
    const { payment_methods, invoices, user, countries } = this.props
    return (
      <div className="container-fluid payments">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <h1 className="">{I18n.t('pages.payments.payment_methods.title')}</h1>
            <InfoBlock>
              If you wish to pay by credit card, you can add your card below. Learn about other payment options.
              <Link to="#" className="mt-1 text-blue"> Learn more</Link>
            </InfoBlock>

            <div className="mt-30">
              <button onClick={this.addBankCard} className="mt-2 mt-sm-0 btn btn-pink mr-2">{I18n.t('pages.payments.payment_methods.add_bank_card')}</button>
              <button onClick={this.addPayPal} className="mt-2 mt-sm-0 btn btn-pink">{I18n.t('pages.payments.payment_methods.add_paypal')}</button>
            </div>

            <table className="table mt-30">
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
                        <img onClick={(e) => this.onDeletePaymentMethod(e, item.id)} id="payment_method_delete" src={icTrashSrc} className="img-fluid" />
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

            <div className="mt-30 d-flex">
              <button onClick={this.onShowCustomizeInvoices} className="mt-2 mt-sm-0 btn btn-outline-pink2 mr-auto">{I18n.t('pages.payments.invoices.customize.btn')}</button>
              <button onClick={this.payCurrentInvoice} className="mt-2 mt-sm-0 btn btn-pink">{I18n.t('pages.payments.invoices.pay_current_invoice.btn')}</button>
            </div>

            <table className="table mt-30">
              <thead>
                <tr>
                  <th className="font-weight-bold">ID</th>
                  <th className="font-weight-bold">Amount</th>
                  <th className="font-weight-bold">Type</th>
                  <th className="font-weight-bold">Status</th>
                  <th className="font-weight-bold">Date</th>
                  <th className="font-weight-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(invoices && invoices.length > 0) ?
                  invoices.map(item =>
                    <tr key={`invoice${item.id}`}>
                      <td>{item.no}</td>
                      <td>{item.currency}{item.amount}</td>
                      <td>{item.invoice_type}</td>
                      <td>{item.status}</td>
                      <td>{item.created_at_humanize}</td>
                      <td className="text-right">
                        <img src={icViewSrc} className="img-fluid" />
                        <img src={icDownloadSrc} className="img-fluid" />
                      </td>
                    </tr>
                  ) :
                  <tr>
                    <td rowSpan="6">Invoices are not found</td>
                  </tr>
                }
              </tbody>
            </table>

            <ModalPopupForm
              onClose={this.onModalClose}
              id='addPaymentMethod'
              isForm={true}
              isHideBtn={true}
              isNextBtnOnly={true}
              // onBtnSave={this.onSaveBankCard}
              title={I18n.t('pages.payments.payment_methods.add_bank_card')}
              btnCloseText={I18n.t('buttons.cancel')}
              btnSaveText={I18n.t('buttons.next')}
              btnClasses={''}>
              <InfoBlock>
                Your current subscription: {(user && user.tariff_plan && user.tariff_plan.title)}
              </InfoBlock>
              <BankCardForm countries={countries} onSaveBankCard={this.onSaveBankCard} onInputChange={this.onInputChange} />
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

            <ModalPopupForm
              onClose={this.onModalClose}
              id='deletePaymentMethod'
              isForm={false}
              isHideBtn={true}
              isNextBtnOnly={true}
              onBtnSave={this.deletePaymentMethod}
              title={I18n.t('pages.payments.payment_methods.delete.title')}
              btnCloseText={I18n.t('buttons.cancel')}
              btnSaveText={I18n.t('buttons.confirm')}
              btnClasses={''}>
              <InfoBlock>
                {I18n.t('pages.payments.payment_methods.delete.info')}
              </InfoBlock>
            </ModalPopupForm>

            <ModalPopupForm
              onClose={this.onModalClose}
              id='customizeInvoices'
              isForm={true}
              isHideBtn={true}
              isNextBtnOnly={true}
              onBtnSave={this.onCustomizeInvoices}
              title={I18n.t('pages.payments.invoices.customize.title')}
              btnCloseText={I18n.t('buttons.cancel')}
              btnSaveText={I18n.t('buttons.new')}
              btnClasses={''}>
              <InfoBlock>
                {I18n.t('pages.payments.invoices.customize.info')}
              </InfoBlock>
              <p>Customize invoices</p>
              <InvoiceCustomizationForm />
            </ModalPopupForm>

            <ModalPopupForm
              onClose={this.onModalClose}
              id='viewInvoice'
              isForm={true}
              isHideBtn={true}
              isNextBtnOnly={true}
              // onBtnSave={this.onCustomizeInvoices}
              title={I18n.t('pages.payments.invoices.customize.title')}
              btnCloseText={I18n.t('buttons.cancel')}
              btnSaveText={I18n.t('buttons.save')}
              btnClasses={''}>
              <InfoBlock>
                {I18n.t('pages.payments.invoices.customize.info')}
              </InfoBlock>
              <p>Customize invoices</p>

            </ModalPopupForm>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { invoices } = state.invoices
  const { payment_methods, countries } = state.global
  const { user } = state.users
  return {
    user, payment_methods, countries, invoices
  }
}

const connectedPage = connect(mapStateToProps)(PaymentsPage)
export { connectedPage as PaymentsPage }