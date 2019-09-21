import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Login from './Login'
import Features from './Features'
import Router from './Router'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router path={this.props.path} context={{}}>
        <div>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/tariff_plans">Plans</Link></li>
          </ul>
        </div>
        <Route path="/" exact render={(props) => (<div>home react {this.props.path} </div>)} />
        <Route exact path="/login" render={() => <Login form_action='/login' token={this.props.token} />} />
        <Route exact path="/features" render={() => <Features />} />
      </Router>
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
