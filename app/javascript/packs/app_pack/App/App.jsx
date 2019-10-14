import React from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';

import { history } from '../_helpers';
import { alertActions, bgClassActions } from '../_actions';

// components
import { Header, PrivateRoute } from '../_components';
import { FooterSection } from '../_sections'

// pages
import { HomePage } from '../HomePage';
import { TicketsPage } from '../TicketsPage'
import { SigninPage } from '../SigninPage'
import { PasswordForgotPage, PasswordResetPage, PasswordResetPageOk } from '../PasswordPage'

import { SignupPage } from '../SignupPage'
import { ComingSoonPage, SuccessPage, NotFoundPage } from '../StatusPages'
import { PricingPage } from '../PricingPage'
import { ContactusPage } from '../ContactusPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFooterVisible: true,
      csrf: '',
      user: [],
      isSignedIn: false,
      // bgClass: 'bg1',
    }
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  UNSAFE_componentWillUpdate() {

  }

  render() {
    const { alert, bgClass } = this.props;
    return (
      <Router history={history}>
        <div className={`container-fluid ${bgClass.value}`}>
          <div className="container">
            <Header />
          </div>

          <div className="container">
            <div className="col">
              {alert.message &&
                <div className={`alert ${alert.type} text-center`}>{alert.message}</div>
              }
            </div>
          </div>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <div className='container'>
              <Switch>
                {/* public pages */}
                <Route exact path="/signin" component={SigninPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/pricing" component={PricingPage} />
                <Route exact path="/forgot" component={PasswordForgotPage} />
                <Route exact path="/password_resets/:token" component={PasswordResetPage} />
                {/* <Route path="/password_resets/:token" render={() => <PasswordResetPage />} /> */}
                {/* <Route exact path="/password_resets/:token" render={({ match }) => (
                  <PasswordResetPage
                    appState={this.state}
                    token={match.params.token}
                    handleIsFooterVisible={this.handleIsFooterVisible}
                  />
                )} /> */}
                <Route exact path="/reset_ok" component={PasswordResetPageOk} />

                <Route exact path="/help" component={ComingSoonPage} />
                <Route exact path="/contact_us" component={ContactusPage} />

                {/* private user's pages */}
                <PrivateRoute exact path="/tickets" component={TicketsPage} />

                {/* status pages */}
                <Route exact path="/200" component={SuccessPage} />
                <Route exact path="/404" component={NotFoundPage} />
                <Route exact path="/204" component={ComingSoonPage} />
                <Route exact path="/coming_soon" component={ComingSoonPage} />

                {/* <Route exact path="/500" render={() => <InternalErrorPage />} /> */}
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </Switch>
        </div>
        {this.state.isFooterVisible && <FooterSection />}
      </Router>
    );
  }
  componentDidMount() {
    smoothscroll.polyfill(); // native smooth scrolling
    this.props.dispatch(bgClassActions.set('bg1'))
  }
}

function mapStateToProps(state) {
  const { alert, bgClass } = state;
  return {
    alert, bgClass
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 