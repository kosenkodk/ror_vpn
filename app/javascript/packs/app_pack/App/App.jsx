import React from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import smoothscroll from 'smoothscroll-polyfill'

import { history } from '../_helpers'
import { alertActions, bgClassActions, departmentActions } from '../_actions'

// components
import { Header, PrivateRoute, PrivateRouteWithRightSidebar } from '../_components'
import { FooterSection } from '../_sections'

// pages
import { HomePage } from '../HomePage'
import { TicketsPage, TicketsNewPage, TicketsEditPage, TicketsViewPage } from '../TicketsPage'

import { SigninPage } from '../SigninPage'
import { PasswordForgotPage, PasswordResetPage, PasswordResetPageOk } from '../PasswordPage'

import { SignupPage } from '../SignupPage'
import { ComingSoonPage, SuccessPage, NotFoundPage } from '../StatusPages'
import { PricingPage } from '../PricingPage'
import { ContactusPage } from '../ContactusPage'
import { urls } from 'config'
// layouts
import { Layout, LayoutWithSidebar } from '../App'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFooterVisible: true,
      csrf: '',
      user: [],
      isSignedIn: false,
    }
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear())

      // set background image
      dispatch(bgClassActions.set('bg1'))
      if ([urls.http204.path, urls.not_found.path, urls.success.path, urls.coming_soon.path, urls.contact_us.path].includes(location.pathname))
        dispatch(bgClassActions.set('bg_star'))
      this.isFooterVisible()

    });
  }

  isFooterVisible() {
    let currentUrl = history.location.pathname
    let resetUrl = '/' + urls.reset.path.split('/')[1]
    this.setState({ isFooterVisible: true })
    if (currentUrl.startsWith(resetUrl) ||
      [urls.forgot.path, urls.reset_ok.path, urls.signin.path].includes(currentUrl))
      this.setState({ isFooterVisible: false })
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
            <div className="row">
              <div className="col">
                {alert.message &&
                  <div id="alert" className={`alert ${alert.type} text-center`}>{alert.message}</div>
                }
              </div>
            </div>
          </div>

          <div className={`${history.location.pathname === urls.home.path ? '' : 'container'}`}>
            <Switch>
              {/* private user's pages */}
              <Route path={urls.user.path}>
                <LayoutWithSidebar>
                  <Switch>
                    <PrivateRoute exact path={urls.tickets.path} component={TicketsPage} />
                    <PrivateRoute exact path={urls.tickets_new.path} component={TicketsNewPage} />
                    <PrivateRoute exact path={urls.tickets_edit.path} component={TicketsEditPage} />
                    <PrivateRoute exact path={urls.tickets_view.path} component={TicketsViewPage} />s
                    <PrivateRouteWithRightSidebar path={urls.user_dashboard.path} sidebarUrls={[urls.user_plans, urls.user_subscriptions, urls.user_billing]} component={ComingSoonPage} />
                    <PrivateRoute path={urls.user_payment.path} component={ComingSoonPage} />
                    <PrivateRoute path={urls.user_downloads.path} component={ComingSoonPage} />
                    <PrivateRoute path={urls.user_invite_friend.path} component={ComingSoonPage} />
                    <PrivateRoute path={urls.user_account.path} component={ComingSoonPage} />
                    {/* <PrivateRoute path={urls.user.path} component={ComingSoonPage} /> */}
                    <PrivateRoute component={NotFoundPage} />
                  </Switch>
                </LayoutWithSidebar>
              </Route>
              {/* public pages */}
              <Route path={[urls.home.path,
              urls.signin.path,
              urls.signup.path,
              urls.pricing.path,
              urls.forgot.path,
              urls.reset.path,
              urls.reset_ok.path,
              urls.help.path,
              urls.contact_us.path,
              urls.success.path,
              urls.not_found.path,
              urls.coming_soon.path,
              urls.http204.path,
              ]} >
                <Layout>
                  <Route exact path={urls.home.path} component={HomePage} />

                  <Route exact path={urls.signin.path} component={SigninPage} />
                  <Route exact path={urls.signup.path} component={SignupPage} />
                  <Route exact path={urls.pricing.path} component={PricingPage} />
                  <Route exact path={urls.forgot.path} component={PasswordForgotPage} />
                  <Route exact path={urls.reset.path} component={PasswordResetPage} />
                  <Route exact path={urls.reset_ok.path} component={PasswordResetPageOk} />

                  <Route exact path={urls.help.path} component={ComingSoonPage} />
                  <Route exact path={urls.contact_us.path} component={ContactusPage} />

                  {/* status pages */}
                  <Route exact path={urls.success.path} component={SuccessPage} />
                  <Route exact path={urls.not_found.path} component={NotFoundPage} />
                  <Route exact path={urls.coming_soon.path} component={ComingSoonPage} />
                  <Route exact path={urls.http204.path} component={ComingSoonPage} />
                  {/* <Route exact path="/500" render={() => <InternalErrorPage />} /> */}
                </Layout>
              </Route>
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
        {this.state.isFooterVisible && <FooterSection />}
      </Router>
    );
  }
  componentDidMount() {
    smoothscroll.polyfill(); // native smooth scrolling
    this.props.dispatch(departmentActions.getAll())
    this.props.dispatch(bgClassActions.set('bg1'))
    this.isFooterVisible()
  }
}

function mapStateToProps(state) {
  const { alert, bgClass, departments } = state;
  return {
    alert, bgClass, departments
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };