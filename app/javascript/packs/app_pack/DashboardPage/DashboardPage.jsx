import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import I18n from 'i18n-js/index.js.erb'
import Plans from '../SignupPage/Plans';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggingIn } = this.props;
    return (
      <div className="">
        <div id="plans">
          <h3>{I18n.t('pages.dashboard.plans.title')}</h3>
          <Plans />
        </div>
        <div id="subscriptions">
          <h3>{I18n.t('pages.dashboard.subscriptions.title')}</h3>
          <p>No any subscription found</p>
        </div>
        <div id="billing">
          <h3>{I18n.t('pages.dashboard.billing.title')}</h3>
          <p>No any billing details found</p>
        </div>
      </div>
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