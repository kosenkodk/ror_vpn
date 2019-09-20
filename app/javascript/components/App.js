import React from 'react'
// import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Login from './Login'
import Features from './Features'
import Router from './Router'

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//
//     );
//   }
// }
// App.propTypes = {
//   token: PropTypes.string,
// };

const App = props => (
  <Router path={props.path} context={props}>
    <Route path="/" exact render={(props) => (<div>token: {props.token}</div>)} />
    <Route exact path="/login" render={() => <Login />} />
    <Route exact path="/features" render={() => <Features />} />
  </Router>
)

export default App
