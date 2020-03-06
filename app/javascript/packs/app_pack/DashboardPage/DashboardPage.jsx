import React from 'react';
import { connect } from 'react-redux';
import { NavHashLink as Link } from 'react-router-hash-link';

// import { userActions } from '../_actions';
import { I18n } from 'helpers';
import Plans from '../DashboardPage/Plans';
import { InfoBlock } from '../_components/admin';
import { ModalPopupForm } from '../_components/ModalPopupForm';
import { accountActions, globalActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';
import { PaymentDetailsCard } from './PaymentDetailsCard';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isForm: false,
    };
    this.onPlanChange = this.onPlanChange.bind(this);
  }

  onPlanChange(e, id) {
    if (e) {
      e.preventDefault();
      this.setStep(e, 1);
      this.props.dispatch(globalActions.setModalShow('changePlan'));
    }
  }

  onModalClose = (e) => {
    e.preventDefault();
    this.props.dispatch(accountActions.clearAlerts());

    this.setState({ isForm: false });
    this.props.dispatch(globalActions.setStep(0));
    this.props.dispatch(globalActions.setModalShow(false));
  }

  setStep(e, step) {
    if (e) e.preventDefault();
    this.props.dispatch(globalActions.setStep(step));

    switch (step) {
      case 0:
        // close modal popup
        this.setState({ title: 'Start today' });
        this.props.dispatch(globalActions.setModalShow(false));
        break;
      case 1:
        // start today
        this.setState({ title: 'Start today' });
        break;
      case 2:
        // payment details
        this.setState({ title: 'Payment details' });
        this.setState({ isForm: true })
        //TODO: this.props.dispatch(accountActions.getPaymentDetails());
        break;
      case 3:
        // upgrading account (loading indicator)
        this.setState({ isForm: false })
        this.setState({ title: 'Upgrading account' });
        // const data = FormDataAsJsonFromEvent(e);
        //TODO: this.props.dispatch(accountActions.changePlan(data))
        break;
      case 4:
        this.setState({ title: 'Success' });
        // success message ?
        break
      default:
        this.onModalClose(e);
    }
  }

  render() {
    const { loggingIn, user, step } = this.props;
    return (
      <div className="container-fluid dashboard pt-0">
        <div>
          <h1>{I18n.t('pages.dashboard.plans.title')}</h1>

          <InfoBlock text="Get 20% bundle discount when you purchase VPNMail and VEGAVPN together." optionalCssClasses="py-1" />

          <Plans onPlanChange={this.onPlanChange} />
        </div>
        <div id="subscriptions" className="subscriptions">
          <h1>{I18n.t('pages.dashboard.subscription.title')}</h1>
          <InfoBlock text={(user && user.tariff_plan && user.tariff_plan.title) || 'Free plan'} linkTitle='Change' optionalCssClasses="py-1" />
        </div>
        {/* <div id="billing" className="">
          <h1>{I18n.t('pages.dashboard.billing.title')}</h1>
          <p>No any billing details found</p>
        </div> */}

        <ModalPopupForm onClose={this.onModalClose}
          id='changePlan'
          isForm={this.state.isForm}
          isHideBtn={true}
          isNextBtnOnly={true}
          onBtnSave={(e) => this.setStep(e, step + 1)}
          title={this.state.title}
          btnCloseText={I18n.t('buttons.cancel')}
          btnSaveText={I18n.t('buttons.next')}
          btnClasses={''}>
          {step === 1 && <React.Fragment>
            <InfoBlock>
              A 20% discount for annual billing has been automatically applied.
            </InfoBlock>
            <table className="table">
              <thead>
                <tr>
                  <th colSpan="2">SUBSCRIPTION DETAILS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>VegaVPN</td>
                  <td>Free</td>
                </tr>
                <tr className="font-weight-bold">
                  <td>Total</td>
                  <td>$2.99 / month</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to="#" >Add coupon</Link>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table">
              <thead>
                <tr>
                  <th colSpan="2">SUBSCRIPTION DETAILS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="font-weight-bold">
                  <td>Total (annual billing)</td>
                  <td>$48</td>
                </tr>
                <tr className="font-weight-bold">
                  <td>Amount due</td>
                  <td>$45.01</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
          }
          {step === 2 && <React.Fragment>
            <InfoBlock>
              Your payment details are protected with TLS encryption and Swiss privacy laws
            </InfoBlock>
            <PaymentDetailsCard onFormSubmit={(e) => this.setStep(e, 2)} />
          </React.Fragment>
          }
          {step === 3 && <React.Fragment>
            <InfoBlock>
              Your account is being upgraded, this may take up to 30 seconds.
            </InfoBlock>
          </React.Fragment>
          }
          {step >= 4 && <React.Fragment>
            <p>
              Success
            </p>
          </React.Fragment>
          }
        </ModalPopupForm>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { step } = state.global;
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn, user, step
  };
}

const connectedPage = connect(mapStateToProps)(DashboardPage);
export { connectedPage as DashboardPage }; 