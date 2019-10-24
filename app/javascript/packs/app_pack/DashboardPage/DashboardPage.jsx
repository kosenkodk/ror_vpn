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
        <Plans />
        <div id="subscriptions">subscription</div>
        <div id="billing">billing</div>

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