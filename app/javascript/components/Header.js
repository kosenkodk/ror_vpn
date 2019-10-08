import React from 'react'
import HeaderNavBar from './HeaderNavBar'

class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="container">
          <HeaderNavBar {...this.props} />
        </div>
      </div>
    )
  }
}
export default Header