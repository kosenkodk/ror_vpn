import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { userActions } from '../_actions';
import { I18n } from 'helpers';
import Plans from '../SignupPage/Plans';

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
    const { loggingIn } = this.props;
    return (
      <React.Fragment>
        {/* <div className="shadow-vega bg-vega"> */}
        <div id="plans" className="">
          <h1>{I18n.t('pages.dashboard.plans.title')}</h1>
          <Plans onPlanChange={this.onPlanChange} />
        </div>
        <div id="subscriptions" className="">
          <h1>{I18n.t('pages.dashboard.subscriptions.title')}</h1>
          <p>No any subscription found</p>
        </div>
        <div id="billing" className="">
          <h1>{I18n.t('pages.dashboard.billing.title')}</h1>
          <p>No any billing details found</p>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedPage = connect(mapStateToProps)(DashboardPage);
export { connectedPage as DashboardPage }; 