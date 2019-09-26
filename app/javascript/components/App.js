import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Features from './Features'
import Router from './Router'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Router path={this.props.path} context={{}}>
          <Route path="/" exact render={() => (<div>home react {this.props.path} </div>)} />
          <Route exact path="/login" render={() => <Login form_action='/login' token={this.props.token} />} />
          <Route exact path="/features" render={() => <Features />} />
        </Router>
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
