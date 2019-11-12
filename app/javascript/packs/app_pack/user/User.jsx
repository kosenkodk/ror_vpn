import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import smoothscroll from 'smoothscroll-polyfill'

import { history } from '../_helpers'
import { alertActions, departmentActions } from '../_actions'
import { urls } from 'config'

// components
import { PrivateRoute, PrivateRouteWithRightSidebar } from '../_components'
import { Header } from '../user'
// pages
import { TicketsPage, TicketsNewPage, TicketsEditPage, TicketsViewPage } from '../TicketsPage'

import { ComingSoonPage, SuccessPage, NotFoundPage } from '../StatusPages'
import { DashboardPage } from '../DashboardPage'
import { AccountPage } from '../AccountPage'

// layouts
import { Layout, LayoutWithSidebar } from '../App'

class User extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear())
    });
  }

  render() {
    const { alert, loggedIn } = this.props;
    return (
      <div className='container-fluid bg1'>
        <div className='container-fluid'>
          <Header />
        </div>
        <div className='container-fluid'>
          <div className="row">
            <div className="col">
              {alert.message && <div id="alert" className={`alert ${alert.type} text-center`}>{alert.message}</div>}
            </div>
          </div>
        </div>

        <section className='container-fluid'>
          <Switch>
            {/* private user's pages */}
            <Route path={urls.user.path}>
              <LayoutWithSidebar>
                <Switch>
                  <PrivateRoute exact path={urls.tickets.path} component={TicketsPage} />
                  {/* <PrivateRoute exact path={urls.tickets_new.path} component={TicketsNewPage} /> */}
                  <PrivateRouteWithRightSidebar exact path={urls.tickets_new.path} component={TicketsNewPage}
                    sidebarUrls={[urls.tickets]}
                  />
                  <PrivateRoute exact path={urls.tickets_edit.path} component={TicketsEditPage} />
                  {/* <PrivateRoute exact path={urls.tickets_view.path} component={TicketsViewPage} /> */}
                  <PrivateRouteWithRightSidebar exact path={urls.tickets_view.path} component={TicketsViewPage}
                    sidebarUrls={[urls.tickets, urls.tickets_new]}
                  />

                  <PrivateRouteWithRightSidebar path={urls.user_dashboard.path} component={DashboardPage}
                    // sidebarUrls={urls.user_dashboard.urls.keys(item).map(index => item[index])}
                    sidebarUrls={Object.values(urls.user_dashboard.urls)}
                  />
                  <PrivateRouteWithRightSidebar path={urls.user_account.path} component={AccountPage}
                    sidebarUrls={Object.values(urls.user_account.urls)}
                  />
                  <PrivateRouteWithRightSidebar path={urls.user_payment.path} component={ComingSoonPage}
                    sidebarUrls={Object.values(urls.user_payment.urls)}
                  />
                  <PrivateRouteWithRightSidebar path={urls.user_downloads.path} component={ComingSoonPage}
                    sidebarUrls={Object.values(urls.user_downloads.urls)}
                  />
                  <PrivateRoute path={urls.user_invite_friend.path} component={ComingSoonPage} />

                  {/* <PrivateRoute path={urls.user.path} component={ComingSoonPage} /> */}
                  <PrivateRoute component={NotFoundPage} />
                </Switch>
              </LayoutWithSidebar>
            </Route>

          </Switch>
        </section>
      </div>
    );
  }
  componentDidMount() {
    smoothscroll.polyfill(); // native smooth scrolling
    this.props.dispatch(departmentActions.getAll())
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication
  const { alert, departments } = state;
  return {
    alert, departments, loggedIn
  };
}

const connectedApp = connect(mapStateToProps)(User);
export { connectedApp as User };