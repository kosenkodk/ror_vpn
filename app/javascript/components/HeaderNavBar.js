import React from 'react'
import logoImage from 'images/logo.png'
import I18n from 'i18n-js/index.js.erb'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

class HeaderNavBar extends React.Component {
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
              <Link to="/signin" className="nav-link pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.log_in')}</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link active pl-3 pr-3 text-left btn btn-outline-pink">{I18n.t('nav_menu.sign_up')}</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default HeaderNavBar