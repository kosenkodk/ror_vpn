import React from 'react';
import { connect } from 'react-redux';
import { NavHashLink as Link } from 'react-router-hash-link';

// import { userActions } from '../_actions';
import { I18n } from 'helpers';
import { InfoBlock } from '../_components/admin';
import { ModalPopupForm } from '../_components/ModalPopupForm';
import { accountActions, globalActions, alertActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';
import icInfoSrc from 'images/admin/ic_warning.svg';

class PaymentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isForm: false,
      planSelected: null,
    };
  }

  render() {
    const { loggingIn, user, step, plans } = this.props;
    const { planSelected } = this.state;
    const { tariff_plan } = user;
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
              <button className="btn btn-pink mr-2">{I18n.t('pages.payments.payment_methods.add_bank_card')}</button>
              <button className="btn btn-pink">{I18n.t('pages.payments.payment_methods.add_paypal')}</button>
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
              // onClose={this.onModalClose}
              id='changePlan'
              isForm={this.state.isForm}
              isHideBtn={true}
              isNextBtnOnly={true}
              // onBtnSave={(e) => this.setStep(e, step + 1)}
              title={this.state.title}
              btnCloseText={I18n.t('buttons.cancel')}
              btnSaveText={I18n.t('buttons.next')}
              btnClasses={''}>
              <InfoBlock>
                Your current subscription: {(user && user.tariff_plan && user.tariff_plan.title)}
              </InfoBlock>
            </ModalPopupForm>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { step, plans } = state.global;
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn, user, step, plans
  };
}

const connectedPage = connect(mapStateToProps)(PaymentsPage);
export { connectedPage as PaymentsPage }; 