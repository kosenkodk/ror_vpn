import React from 'react';
import { connect } from 'react-redux';

// import { userActions } from '../_actions';
import { I18n } from 'helpers';
import Plans from '../SignupPage/Plans';
import { InfoBlock } from '../_components/admin';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.onPlanChange = this.onPlanChange.bind(this);
  }

  onPlanChange(e, id) {
    if (e) e.preventDefault();
    // todo: will implement
  }

  render() {
    const { loggingIn, user } = this.props;
    return (
      <React.Fragment>
        <div id="plans" className="">
          <h1>{I18n.t('pages.dashboard.plans.title')}</h1>

          <InfoBlock text="Get 20% bundle discount when you purchase VPNMail and VEGAVPN together." />

          <Plans onPlanChange={this.onPlanChange} />
        </div>
        <div id="subscriptions" className="">
          <h1>{I18n.t('pages.dashboard.subscriptions.title')}</h1>
          <InfoBlock text={(user && user.tariff_plan && user.tariff_plan.title) || 'Free plan'} linkTitle='Change' />
        </div>
        {/* <div id="billing" className="">
          <h1>{I18n.t('pages.dashboard.billing.title')}</h1>
          <p>No any billing details found</p>
        </div> */}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn, user
  };
}

const connectedPage = connect(mapStateToProps)(DashboardPage);
export { connectedPage as DashboardPage }; 