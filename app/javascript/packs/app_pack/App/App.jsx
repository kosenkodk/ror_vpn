import React from 'react'
import { Switch, Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import smoothscroll from 'smoothscroll-polyfill'

import { history } from '../_helpers'
import { pageActions, alertActions, bgClassActions, departmentActions } from '../_actions'
import { urls } from 'config'

// components
import { PrivateRoute, PrivateRouteWithRightSidebar } from '../_components'

// pages
import { HomePage } from '../HomePage'
import { TicketsPage, TicketsNewPage, TicketsEditPage, TicketsViewPage } from '../TicketsPage'

import { SigninPage } from '../SigninPage'
import { PasswordForgotPage, PasswordResetPage, PasswordResetPageOk } from '../PasswordPage'

import { SignupPage } from '../SignupPage'
import { ComingSoonPage, SuccessPage, NotFoundPage } from '../StatusPages'
import { PricingPage } from '../PricingPage'
import { ContactusPage } from '../ContactusPage'
import { DashboardPage } from '../DashboardPage'
import { AccountPage } from '../AccountPage'

// layouts
import { GuestLayout, AdminLayout, LayoutWithSidebar } from '../App'

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

      this.setPageTitle(location)

      // set background image
      dispatch(bgClassActions.set('bg1'))
      if ([urls.http204.path, urls.not_found.path, urls.success.path, urls.coming_soon.path, urls.contact_us.path].includes(location.pathname))
        dispatch(bgClassActions.set('bg_star'))
      this.isFooterVisible()
    });
  }

  setPageTitle(location) {
    // set title for admin panel
    let filteredUrls = Object.values(urls).filter(item => {
      // console.log('URL', item, 'curr path', location.pathname)
      return item.path.startsWith(location.pathname) ? item : ''
    });
    // console.log('current url Name: ', filteredUrls[0].name)
    this.props.dispatch(pageActions.setTitle(filteredUrls.length > 0 && filteredUrls[0].name || ''))
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
    return (
      <Router history={history}>
        <Switch>
          {/* private user's pages */}
          <Route path={urls.user.path}>
            <AdminLayout>
              <Switch>
                <PrivateRoute exact path={urls.tickets.path} component={TicketsPage} />
                <PrivateRoute exact path={urls.tickets_new.path} component={TicketsNewPage} />
                {/* <PrivateRouteWithRightSidebar exact path={urls.tickets_new.path} component={TicketsNewPage}
                  sidebarUrls={[urls.tickets]} /> */}

                <PrivateRoute exact path={urls.tickets_edit.path} component={TicketsEditPage} />
                <PrivateRoute exact path={urls.tickets_view.path} component={TicketsViewPage} />
                {/* <PrivateRouteWithRightSidebar exact path={urls.tickets_view.path} component={TicketsViewPage}
                  sidebarUrls={[urls.tickets, urls.tickets_new]} /> */}

                <PrivateRoute exact path={urls.user_dashboard.path} component={DashboardPage} />
                {/* <PrivateRouteWithRightSidebar path={urls.user_dashboard.path} component={DashboardPage}
                  // sidebarUrls={urls.user_dashboard.urls.keys(item).map(index => item[index])} />
                  sidebarUrls={Object.values(urls.user_dashboard.urls)} /> */}

                <PrivateRoute exact path={urls.user_account.path} component={AccountPage} />
                {/* <PrivateRouteWithRightSidebar path={urls.user_account.path} component={AccountPage}
                  sidebarUrls={Object.values(urls.user_account.urls)} /> */}

                <PrivateRoute exact path={urls.user_payment.path} component={ComingSoonPage} />
                {/* <PrivateRouteWithRightSidebar path={urls.user_payment.path} component={ComingSoonPage}
                  sidebarUrls={Object.values(urls.user_payment.urls)} /> */}

                <PrivateRoute exact path={urls.user_downloads.path} component={ComingSoonPage} />
                {/* <PrivateRouteWithRightSidebar path={urls.user_downloads.path} component={ComingSoonPage}
                  sidebarUrls={Object.values(urls.user_downloads.urls)} /> */}

                <PrivateRoute path={urls.user_invite_friend.path} component={ComingSoonPage} />

                <PrivateRoute component={NotFoundPage} />
              </Switch>
            </AdminLayout>
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
            <GuestLayout isFooterVisible={this.state.isFooterVisible}>
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
            </GuestLayout>
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
  componentDidMount() {
    smoothscroll.polyfill(); // native smooth scrolling
    this.props.dispatch(departmentActions.getAll())
    this.props.dispatch(bgClassActions.set('bg1'))
    this.isFooterVisible()
    this.setPageTitle(history.location)
  }
}

function mapStateToProps(state) {
  const { departments } = state;
  return {
    departments
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };