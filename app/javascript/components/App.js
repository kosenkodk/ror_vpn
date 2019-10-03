import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill';

import Header from './Header'
import FooterSection from './sections/FooterSection'
import SigninPage from './SigninPage'
import Features from './Features'
import Router from './Router'
import ComingSoonPage from './ComingSoonPage'
import Home from './HomePage/Home'
import NotFoundPage from './NotFoundPage'
import SuccessPage from './SuccessPage'
import PricingPage from './PricingPage'
import PasswordResetPage from './PasswordResetPage'
import PasswordResetPageOk from './PasswordResetPageOk'
import PasswordForgotPage from './PasswordForgotPage'
import ContactusPage from './ContactusPage'
import SignupPage from './SignupPage/SignupPage'
import TicketsPage from './TicketsPage/TicketsPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFooterVisible: true,
      csrf: '',
      user: [],
      isSignedIn: false,
      bgClass: 'bg1'
    }
    this.handleIsFooterVisible = this.handleIsFooterVisible.bind(this);
    this.unsetCurrentUser = this.unsetCurrentUser.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }


  getBackgdroundClass() {
    let className = 'bg1'
    for (let item of ['/404', '/200', '/204', '/coming_soon', '/contacts/new', 'contact_us']) {
      if (item === this.props.path) {
        className = 'bg_star';
        break;
      }
    }

    for (let item of ['/signin', '/forgot', '/reset', '/reset_ok']) {
      if (item === this.props.path) {
        className = 'bg1_cover';
        break;
      }
    }

    return className;
  }

  handleIsFooterVisible(isVisible) {
    this.setState({
      isFooterVisible: isVisible
    })
  }

  unsetCurrentUser() {
    console.log('unsetCurrentUser')
    this.setState({ user: [], csrf: '', isSignedIn: false })
  }

  setCurrentUser(user, csrf) {
    // user fields: email, id, role
    console.log('setCurrentUser', user, csrf)
    this.setState({ user: user, csrf: csrf, isSignedIn: true })
  }

  render() {
    return (
      <Router path={this.props.path} context={{}} >

        <div className={`container-fluid bg1`}>
          <div className="container">
            <Header />
          </div>

          <Route exact path="/" render={() => <Home />} />

          <div className='container'>

            {/* <Route path="/" exact render={() => (<div>home react {this.props.path} </div>)} /> */}
            <Route exact path="/signin" render={() => <SigninPage isSignedIn={this.state.isSignedIn} unsetCurrentUser={this.unsetCurrentUser} setCurrentUser={this.setCurrentUser} handleIsFooterVisible={this.handleIsFooterVisible} form_action='/login' token={this.props.token} />} />
            <Route exact path="/signup" render={() => <SignupPage isSignedIn={this.state.isSignedIn} unsetCurrentUser={this.unsetCurrentUser} setCurrentUser={this.setCurrentUser} />} />
            <Route exact path="/contact_us" render={() => <ContactusPage />} />
            <Route exact path="/contacts/new" render={() => <ContactusPage />} />
            <Route exact path="/forgot" render={() => <PasswordForgotPage handleIsFooterVisible={this.handleIsFooterVisible} />} />
            <Route exact path="/reset" render={() => <PasswordResetPage handleIsFooterVisible={this.handleIsFooterVisible} />} />
            <Route exact path="/reset_ok" render={() => <PasswordResetPageOk handleIsFooterVisible={this.handleIsFooterVisible} />} />

            <Route exact path="/pricing" render={() => <PricingPage />} />
            <Route exact path="/help" render={() => <ComingSoonPage />} />
            <Route exact path="/404" render={() => <NotFoundPage />} />
            <Route exact path="/200" render={() => <SuccessPage />} />
            <Route exact path="/204" render={() => <ComingSoonPage />} />
            <Route exact path="/coming_soon" render={() => <ComingSoonPage />} />

            {/* <Route exact path="/500" render={() => <InternalErrorPage />} /> */}

            <Route exact path="/features" render={() => <Features />} />
            <Route exact path="/tickets" render={() => <TicketsPage />} />
          </div>
        </div>
        {this.state.isFooterVisible && <FooterSection />}
      </Router>
    );
  }
  componentDidUpdate() {
    // console.log('app > componentDidUpdate')
    // this.setState({ bgClass: this.getBackgdroundClass() })
  }
  componentDidMount() {
    smoothscroll.polyfill(); // native smooth scrolling
    this.setState({ bgClass: this.getBackgdroundClass() })
  }
}

App.propTypes = {
  token: PropTypes.string,
  path: PropTypes.string,
};

// const App = props => (
//   <Router path={props.path} context={props}>
//     <Route path="/" exact render={(props) => (<div>token: {props.token}</div>)} />
//     <Route exact path="/signin" render={() => <Login />} />
//     <Route exact path="/features" render={() => <Features />} />
//   </Router>
// )

export default App
