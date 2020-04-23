import React from 'react'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
// import { Switch } from 'react-router-dom'

class Router extends React.Component {
  renderRouter = () => {
    if (typeof window !== 'undefined') {
      return (
        <BrowserRouter>
          {/* <Switch> */}
          {this.props.children}
          {/* </Switch> */}
        </BrowserRouter>
      )
    } else {
      return (
        <StaticRouter location={this.props.path} context={{}}>
          {this.props.children}
        </StaticRouter>
      )
    }
  }

  render() {
    return (this.renderRouter())
  }
}

export default Router