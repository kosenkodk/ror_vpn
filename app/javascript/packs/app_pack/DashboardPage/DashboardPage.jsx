import React from 'react';
import { connect } from 'react-redux';
import { NavHashLink as Link } from 'react-router-hash-link';

// import { userActions } from '../_actions';
import { I18n } from 'helpers';
import Plans from '../DashboardPage/Plans';
import { InfoBlock } from '../_components/admin';
import { ModalPopupForm } from '../_components/ModalPopupForm';
import { accountActions, globalActions, alertActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';
import { PaymentDetailsCard } from './PaymentDetailsCard';
import loadingIndicator from 'images/dashboard/upgrading_loading_indicators.svg';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      isForm: false,
      planSelected: null,
    };
    this.onPlanChange = this.onPlanChange.bind(this);
  }

  onPlanChange(e, id, index) {
    this.props.dispatch(globalActions.setPaymentMethod(null))
    if (this.props.user && this.props.user.tariff_plan && this.props.user.tariff_plan.id === id) {
      this.props.dispatch(alertActions.error('You already have this tariff plan'))
      return
    }
    this.setState({ planSelected: this.props.plans[index] })
    if (e) {
      e.preventDefault();
      this.setStep(e, 1);
      this.props.dispatch(globalActions.setModalShow('changePlan'));
    }
  }

  onModalClose = (e) => {
    if (e) e.preventDefault();
    this.props.dispatch(accountActions.clearAlerts());

    this.setState({ isForm: false });
    this.props.dispatch(globalActions.setStep(0));
    this.props.dispatch(globalActions.setModalShow(false));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.step)
      this.setStep(null, nextProps.step);
  }

  setStep(e, step) {
    if (e) e.preventDefault();
    this.props.dispatch(globalActions.setStep(step));
    switch (step) {
      case 0:
        // close modal popup
        this.onModalClose(e);
        break;
      case 1:
        // start today
        this.setState({ title: 'Start today' });
        this.setState({ isForm: false });
        break;
      case 2:
        // payment details
        this.setState({ title: 'Payment details' });
        this.setState({ isForm: true });
        break;
      case 3:
        // upgrading account (loading indicator)
        this.setState({ isForm: true });
        this.setState({ title: 'Upgrading account' });
        if (e) {
          const data = FormDataAsJsonFromEvent(e);
          this.props.dispatch(accountActions.changePlan(data))
        }
        break;
      case 4:
        this.setState({ title: 'Success' });
        this.setState({ isForm: false });
        // success message ?
        break;
      default:
        this.onModalClose(e);
    }
  }

  componentDidMount() {
    this.props.dispatch(globalActions.getPlans())
  }

  componentWillUnmount() {
    this.props.dispatch(globalActions.setPaymentMethod(null))
  }

  render() {
    const { loggingIn, user, step, plans } = this.props;
    const { planSelected } = this.state;
    const { tariff_plan } = user;
    return (
      <div className="container-fluid dashboard">
        <div className="mt-30">
          <h1>{I18n.t('pages.dashboard.plans.title')}</h1>
          {/* <InfoBlock text="Get 20% bundle discount when you purchase VPNMail and VEGAVPN together." optionalCssClasses="py-1" /> */}
          <Plans plans={plans} onPlanChange={this.onPlanChange} planCurrent={user.tariff_plan} />
        </div>
        <div id="subscriptions" className="subscriptions">
          <h1>{I18n.t('pages.dashboard.subscription.title')}</h1>
          <InfoBlock optionalCssClasses="py-1" >
            {(user && user.tariff_plan && user.tariff_plan.title) || 'Free plan'} {user.expired_at_humanize && `till ${user.expired_at_humanize}`}
          </InfoBlock>
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
              {/* A 20% discount for annual billing has been automatically applied. */}
              Your current subscription: {(user && user.tariff_plan && user.tariff_plan.title)}
            </InfoBlock>
            <table className="table mt-30">
              <thead>
                <tr>
                  <th colSpan="2">SUBSCRIPTION DETAILS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>VegaVPN</td>
                  <td className="text-right">{planSelected && planSelected.title}</td>
                </tr>
                <tr className="font-weight-bold">
                  <td>Total</td>
                  <td className="text-right"> ${planSelected && planSelected.price} / month</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Link to="#" className="text-blue">Add coupon</Link>
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
                {/* <tr className="font-weight-bold">
                  <td>Total (annual billing)</td>
                  <td className="text-right">${planSelected.price * 12}</td>
                </tr> */}
                <tr className="font-weight-bold">
                  <td>Amount due</td>
                  <td className="text-right">${planSelected && planSelected.price}</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
          }
          {step === 2 && <React.Fragment>
            <InfoBlock>
              Your payment details are protected with TLS encryption and Swiss privacy laws
            </InfoBlock>
            <PaymentDetailsCard planSelected={planSelected} onFormSubmit={(e) => this.setStep(e, step + 1)} />
          </React.Fragment>
          }
          {step === 3 && <React.Fragment>
            <InfoBlock>
              Your account is being upgraded, this may take up to 30 seconds.
            </InfoBlock>
            <div className="text-center">
              <img src={loadingIndicator} className="img-fluid" />
            </div>
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
  const { step, plans } = state.global;
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn, user, step, plans
  };
}

const connectedPage = connect(mapStateToProps)(DashboardPage);
export { connectedPage as DashboardPage }; 