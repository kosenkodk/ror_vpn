import React from 'react'
import logoImage from 'images/logo.png'
import { I18n } from 'helpers'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { httpRequestAndRefreshToken, httpSecuredRequest, handleErrors } from 'helpers/http'
import { config } from 'config'
import { withRouter } from "react-router-dom";

class HeaderNavBar extends React.Component {

  signOut = (e) => {
    e.preventDefault()

    // fetch(httpRequestAndRefreshToken(`${config.apiUrl}/signin`, 'DELETE', {}, this.props.appState.csrf))
    // fetch(httpSecuredRequest(`${config.apiUrl}/signin`, 'DELETE', {}, this.props.appState.csrf))
    httpRequestAndRefreshToken(`${config.apiUrl}/signin`, 'DELETE', {}, this.props.appState.csrf)
      // .then(handleErrors)
      .then((item, message) => {
        // console.log('/signout success', item)
        // unset current user
        this.props.setAppState({
          user: [],
          csrf: '',
          isSignedIn: false
        })
        this.props.history.push(config.urlAfterSignout)
      })
      .catch((error) => {
        // if (error.status === 401) {

        // }
        // console.log('/signout error', error)
        //TODO: Flash message with text "Can not sign out"
        // or force logout on client side

        // this.props.unsetCurrentUser()
        this.props.setAppState({
          isSignedIn: false
        })
        this.props.history.push(config.urlAfterSignout)
      })
  }

  render() {
    return (
      <nav className="nav navbar navbar-expand-md navbar-dark bg-transparent">
        <Link to="/">
          <img src={logoImage} className='navbar-brand mr-auto ml-2' alt='Vega VPN'></img>
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar6">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse justify-content-stretch" id="navbar6">
          {
            this.props.appState.isSignedIn ?
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <HashLink smooth to="/#features" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.features')}</HashLink>
                </li>
                <li className="nav-item">
                  <HashLink smooth to="/#downloads" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.apps')}</HashLink>
                </li>
                <li className="nav-item">
                  <Link to="/contacts/new" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.contact_us')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/coming_soon" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.help')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/tickets" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.tickets')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signout" onClick={this.signOut} className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.sign_out')}</Link>
                </li>
              </ul>
              :
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <HashLink smooth to="/#features" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.features')}</HashLink>
                </li>
                <li className="nav-item">
                  <Link to="/pricing" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.pricing')}</Link>
                </li>
                <li className="nav-item">
                  <HashLink smooth to="/#downloads" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.apps')}</HashLink>
                </li>
                <li className="nav-item">
                  <Link to="/contacts/new" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.contact_us')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/coming_soon" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.help')}</Link>
                </li>
                <li className="nav-item d-block d-sm-none">
                  <a className="nav-link"></a>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.sign_in')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link active pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.sign_up')}</Link>
                </li>
              </ul>
          }
        </div>
      </nav>
    )
  }
}

export default withRouter(HeaderNavBar)