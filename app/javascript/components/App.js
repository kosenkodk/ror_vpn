import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Features from './Features'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/react_app" render={() => "react app > Home!"} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/features" render={() => <Features />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App
