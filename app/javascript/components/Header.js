import React from 'react'
import HeaderNavBar from './HeaderNavBar'

class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="container">
          <HeaderNavBar appState={this.props.appState} />
        </div>
      </div>
    )
  }
}
export default Header