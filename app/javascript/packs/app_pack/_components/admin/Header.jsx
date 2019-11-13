import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { urls } from 'config';

class Header extends React.Component {

  signOut = (e) => {
    this.props.dispatch(userActions.logout());
    e.preventDefault();
  }

  render() {
    const { loggedIn } = this.props;

    return (
      <nav className="nav navbar navbar-expand-md navbar-dark bg-transparent">
        <div className="header row justify-content-end">
          <div classname="col-auto"></div>
          <div className="col-auto ml-auto">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarAdmin">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse justify-content-stretch" id="navbarAdmin">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavHashLink to={urls.signout.path} onClick={this.signOut} activeClassName="" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink active">{urls.signout.name}</NavHashLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
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
