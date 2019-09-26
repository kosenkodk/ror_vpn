import React from 'react'
import logoImage from 'images/logo.png'
import I18n from 'i18n-js/index.js.erb'

class HeaderNavBar extends React.Component {
  render() {
    return (
      <nav className="nav navbar navbar-expand-md navbar-dark bg-transparent">
        <a href='/'><img src={logoImage} className='navbar-brand mr-auto ml-2' alt='Vega VPN'></img></a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar6">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse justify-content-stretch" id="navbar6">

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/#features">{I18n.t('nav_menu.features')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/pricing"> {I18n.t('nav_menu.pricing')} </a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/#downloads">{I18n.t('nav_menu.apps')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/contacts/new">{I18n.t('nav_menu.contact_us')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/coming_soon">{I18n.t('nav_menu.help')}</a>
            </li>
            <li className="nav-item d-block d-sm-none">
              <a className="nav-link"></a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/login">{I18n.t('nav_menu.log_in')}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink active"
                href="/signup">{I18n.t('nav_menu.sign_up')}</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default HeaderNavBar