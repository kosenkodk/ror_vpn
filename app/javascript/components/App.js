import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Header from './Header'
import FooterSection from './sections/FooterSection'
import Login from './Login'
import Features from './Features'
import Router from './Router'

import Home from './HomePage/Home'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container-fluid bg1">
          <div className="row">
            <div className="container">
              <Header />
            </div>
            <div className={this.props.path === '/' ? 'row' : 'container'}>
              <Router path={this.props.path} context={{}}>
                {/* <Route path="/" exact render={() => (<div>home react {this.props.path} </div>)} /> */}
                <Route exact path="/" render={() => <Home features={this.props.features} />} />
                <Route exact path="/login" render={() => <Login form_action='/login' token={this.props.token} />} />
                <Route exact path="/signup" render={() => <Login form_action='/login' token={this.props.token} />} />
                <Route exact path="/contact_us" render={() => <Login form_action='/login' token={this.props.token} />} />
                <Route exact path="/coming_soon" render={() => <Login form_action='/login' token={this.props.token} />} />
                <Route exact path="/status_page" render={() => <Login form_action='/login' token={this.props.token} />} />
                <Route exact path="/forgot" render={() => <Login form_action='/login' token={this.props.token} />} />
                <Route exact path="/reset" render={() => <Login form_action='/login' token={this.props.token} />} />
                <Route exact path="/pricing" render={() => <Login form_action='/login' token={this.props.token} />} />
                <Route exact path="/help" render={() => <Login form_action='/login' token={this.props.token} />} />

                <Route exact path="/features" render={() => <Features />} />
              </Router>
            </div>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }
}

App.propTypes = {
  token: PropTypes.string,
  path: PropTypes.string,
};

// const App = props => (
//   <Router path={props.path} context={props}>
//     <Route path="/" exact render={(props) => (<div>token: {props.token}</div>)} />
//     <Route exact path="/login" render={() => <Login />} />
//     <Route exact path="/features" render={() => <Features />} />
//   </Router>
// )

export default App
