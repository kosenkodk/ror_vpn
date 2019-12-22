import React from 'react'
import { matchPath } from "react-router";
import { Switch, Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import smoothscroll from 'smoothscroll-polyfill'

import { history } from '../_helpers'
import { ticketActions, pageActions, alertActions, bgClassActions, departmentActions } from '../_actions'
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
      this.isFooterVisible()

      // reset ticket's statuses
      this.resetTicketStatusesByLocation(location)
    });
  }

  componentDidUpdate(prevProps) {
    // if (this.props.location !== prevProps.location) {
    window.scrollTo(0, 0); // move scroll to top on new page 
    // }
    this.setBackgroundImages(history.location)
    this.calculateHeight()
    this.onScrollNavbar()
  }

  resetTicketStatusesByLocation(location) {
    if (this.isMatchUrls(location.pathname, urls.tickets_view.path) ||
      this.isMatchUrls(location.pathname, urls.tickets.path)) return;
    // if (!location.pathname.startsWith('/user/tickets')) {
    this.props.dispatch(ticketActions.filterBy({ page: 1, status: '' }));
    this.props.dispatch(ticketActions.getAll({ page: 1, status: '' }));
    // }
  }

  isMatchUrls(url1, url2) {
    const match = matchPath(url1, {
      path: url2,
      exact: true,
      strict: false
    });
    return match ? true : false
  }

  UNSAFE_componentWillUpdate() {
    this.setPageTitle(history.location)
  }

  componentDidMount() {
    smoothscroll.polyfill(); // native smooth scrolling
    this.props.dispatch(departmentActions.getAll())
    this.props.dispatch(bgClassActions.set('bg1', 'bg1'))
    this.isFooterVisible()
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

  onScrollNavbar() {
    // Navbar - change transparent bg color on black during scroll
    // grabbing the class names from the data attributes
    const navBar = $('#navbar');
    // booleans used to tame the scroll event listening a little..
    let scrolling = false,
      scrolledPast = false;

    // transition Into
    function switchInto() {
      // update `scrolledPast` bool
      scrolledPast = true;
      // add/remove CSS classes
      navBar.addClass('bg-color-black');
      navBar.addClass('shadow-vega');
      // console.log('into transition triggered!', navbar.id)
    };

    // transition Start
    function switchStart() {
      // update `scrolledPast` bool
      scrolledPast = false;
      // add/remove CSS classes
      navBar.removeClass('bg-color-black');
      navBar.removeClass('shadow-vega');
      // console.log('start transition triggered!', navbar.id)
    }

    // set `scrolling` to true when user scrolls
    $(window).scroll(() => scrolling = true);

    setInterval(() => {
      // when `scrolling` becomes true... 
      if (scrolling) {
        // set it back to false
        scrolling = false;
        // check scroll position
        if ($(window).scrollTop() > 50) {
          // user has scrolled > 50px from top since last check
          if (!scrolledPast) {
            switchInto();
          }
        } else {
          // user has scrolled back <= 100px from top since last check
          if (scrolledPast) {
            switchStart();
          }
        }
      }
      // take a breath.. hold event listener from firing for 100ms
    }, 100);
  }


  calculateHeight() {
    let heightSection = 0, heightFooter = 0, heightNavBar = 0, totalHeight = 0;
    try {
      totalHeight = document.body.clientHeight

      if (document.getElementById('navbar') != null) {
        heightNavBar = document.getElementById('navbar').clientHeight
        heightSection = totalHeight - heightNavBar
      }
      if (document.getElementById('footer') != null) {
        heightFooter = document.getElementById('footer').clientHeight
        heightSection -= heightFooter
      }
      // console.log('total height', totalHeight, 'navbar', heightNavBar, 'footer', heightFooter, 'main content height', heightSection)
    } catch (e) {
      // console.log('calculateHeight exception', e.message)
    }
    this.props.dispatch(pageActions.setSectionHeight(heightSection || '100vh'))
  }

  setBackgroundImages() {
    // set background image
    const { dispatch } = this.props
    dispatch(bgClassActions.set('bg1', 'bg1'))
    // dispatch(bgClassActions.set('bg_stars', ''))
    if ([urls.http204.path, urls.not_found.path, urls.success.path, urls.coming_soon.path, urls.contact_us.path].includes(location.pathname)) {
      dispatch(bgClassActions.set('bg1', 'bg_star'))
      // dispatch(bgClassActions.set('bg1', ''))
    }

    // set second background image (with stars)
    if (
      location.pathname.startsWith(this.pathWithoutParams(urls.reset.path)) ||
      [
        // urls.home.path,
        urls.signin.path, urls.forgot.path, urls.reset_ok.path].includes(location.pathname)
    ) {
      // dispatch(bgClassActions.set('bg_stars', 'bg_stars'))
      dispatch(bgClassActions.set('bg1', 'bg_vega_with_stars'))
    }
  }

  setPageTitle(location) {
    let pageTitle = Object.values(urls).reduce((prevItem, curItem, index) => {
      const match = matchPath(location.pathname, {
        path: curItem.path,
        exact: true,
        strict: false
      });
      return match ? curItem.name : prevItem.name || prevItem
      // return curItem.path.startsWith(location.pathname) ? curItem.name : prevItem.name || prevItem
    });
    this.props.dispatch(pageActions.setTitle(pageTitle))
  }

  pathWithoutParams(fullPath) {
    // password_resets/:token
    // return /password_resets
    const path = '/' + fullPath.split('/')[1]
    return path
  }

  isFooterVisible() {
    const currentUrl = history.location.pathname
    const resetUrl = this.pathWithoutParams(urls.reset.path)
    this.setState({ isFooterVisible: true })
    if (currentUrl.startsWith(resetUrl) ||
      [urls.forgot.path, urls.reset_ok.path, urls.signin.path].includes(currentUrl))
      this.setState({ isFooterVisible: false })
  }

}

function mapStateToProps(state) {
  const { page } = state.tickets;
  const { departments } = state;
  return {
    departments,
    page // tickets page
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };