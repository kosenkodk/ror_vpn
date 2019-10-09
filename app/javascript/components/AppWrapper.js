import React from 'react'
import Router from './Router'
import App from './App'

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router path={this.props.path} context={{}} >
        <App path={this.props.path} />
      </Router>
    );
  }
}

export default AppWrapper
