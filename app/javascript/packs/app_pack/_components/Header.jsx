import React from 'react'
import { HeaderNavBar } from './HeaderNavBar'
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { loggedIn } = this.props

    return (
      <div className="header row">
        <div className={`${loggedIn ? 'container-fluid' : 'container'}`}>
          <HeaderNavBar />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  return {
    loggedIn,
  };
}

const connectedPage = connect(mapStateToProps)(Header);
export { connectedPage as Header }; 