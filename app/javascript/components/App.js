import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import Features from './Features'
// import Plans from './Plans'
// import history from 'history'
import { createBrowserHistory, createMemoryHistory } from 'history';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // const history = createMemoryHistory();
    const isServer = true
    const history = isServer
      ? createMemoryHistory({
        initialEntries: ['/']
      })
      : createBrowserHistory();
    return (
      // <BrowserRouter>
      // <Switch>
      <Router history={history}>
        <Route path="/" exact render={(props) => (<div>Helloworld</div>)} />
        {/* <Route exact path="/react_app" render={() => "react app > Home!"} /> */}
        {/* <Route exact path="/login" render={() => <Login />} /> */}
        {/* <Route exact path="/features" render={() => <Features />} /> */}
        {/* <Route exact path="/tariff_plans" render={() => <Plans />} /> */}
      </Router>
      // </Switch>
      // </BrowserRouter>
    );
  }
}

App.propTypes = {
  token: PropTypes.string,
};

export default App
