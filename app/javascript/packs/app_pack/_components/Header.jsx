import React from 'react'
import { HeaderNavBar } from './HeaderNavBar'

class Header extends React.Component {
  render() {
    return (
      <div className="header row">
        <div className="container">
          <HeaderNavBar />
        </div>
      </div>
    )
  }
}
export { Header }