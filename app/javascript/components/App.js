import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Features from './Features'
// import Plans from './Plans'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/react_app" render={() => "react app > Home!"} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/features" render={() => <Features />} />
          {/* <Route exact path="/tariff_plans" render={() => <Plans />} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App
