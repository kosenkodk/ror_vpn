import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';

import { history } from '../_helpers';
import { alertActions } from '../_actions';

// components
import { Header, PrivateRoute } from '../_components';
import { FooterSection } from '../_sections'
// import { Features } from '../_sections/Features'

// pages
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { TicketsPage } from '../TicketsPage'
import { SigninPage } from '../SigninPage'

// import { SignupPage } from '../SignupPage'
// import { ComingSoonPage } from '../ComingSoonPage'
// import { Home } from '../HomePage'
// import { NotFoundPage } from '../NotFoundPage'
// import { SuccessPage } from '../SuccessPage'
// import { PricingPage } from '../PricingPage'
// import { PasswordResetPage } from '../PasswordResetPage'
// import { PasswordResetPageOk } from '../PasswordResetPageOk'
// import { PasswordForgotPage } from '../PasswordForgotPage'
// import { ContactusPage } from '../ContactusPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFooterVisible: true,
      csrf: '',
      user: [],
      isSignedIn: false,
      bgClass: 'bg1',
    }
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>

        <div className={`container-fluid ${this.state.bgClass}`}>
          <div className="container">
            <Header />
          </div>

          <div className="container">
            <div className="col-8 offset-2">
              {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
            </div>
          </div>

          <Route exact path="/" render={() => <HomePage />} />

          <div className='container'>
            {/* <Route exact path="/signin" render={() => <SigninPage />} /> */}
            <Route path="/signin" component={SigninPage} />
            <Route exact path="/" component={HomePage} />
            <PrivateRoute exact path="/tickets" component={TicketsPage} />
            {/* <PrivateRoute exact path="/tickets" render={() => <TicketsPage />} /> */}

            {/*
            <Route exact path="/signup" render={() => <SignupPage />} />
            <Route exact path="/contact_us" render={() => <ContactusPage />} />
            <Route exact path="/contacts/new" render={() => <ContactusPage />} />
            <Route exact path="/forgot" render={() => <PasswordForgotPage />} />
            <Route exact path="/password_resets/:token" render={() => <PasswordResetPage />} /> 
            <Route exact path="/reset_ok" render={() => <PasswordResetPageOk />} />

            <Route exact path="/pricing" render={() => <PricingPage />} />
            <Route exact path="/help" render={() => <ComingSoonPage />} />
            <Route exact path="/404" render={() => <NotFoundPage />} />
            <Route exact path="/200" render={() => <SuccessPage />} />
            <Route exact path="/204" render={() => <ComingSoonPage />} />
            <Route exact path="/coming_soon" render={() => <ComingSoonPage />} />

            <Route exact path="/features" render={() => <Features />} />
            */}

            {/* <Route exact path="/500" render={() => <InternalErrorPage />} /> */}

          </div>
        </div>
        {this.state.isFooterVisible && <FooterSection />}

        {/* <div>
                <PrivateRoute exact path="/" component={TicketsPage} />
                <Route path="/login" component={LoginPage} />
              </div> */}
      </Router>

    );
  }
  componentDidMount() {
    smoothscroll.polyfill(); // native smooth scrolling
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 