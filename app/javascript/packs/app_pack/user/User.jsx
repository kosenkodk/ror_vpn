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
          <div className='row'>
            <div className='col'>
              {alert.message && <div id='alert' className={`alert ${alert.type} text-center`}>{alert.message}</div>}
            </div>
          </div>
        </div>

        <section className='container-fluid'>
          <Switch>
            {this.props.privateRoutes}
            {this.props.publicRoutes}
            <Route component={NotFoundPage} />
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