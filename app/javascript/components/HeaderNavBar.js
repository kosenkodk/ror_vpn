import React from 'react'
import logoImage from 'images/logo.png'

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
                href="/#features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/pricing"> Pricing </a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/#downloads">Downloads</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/contacts/new>">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/coming_soon">Help</a>
            </li>
            <li className="nav-item d-block d-sm-none">
              <a className="nav-link"></a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink"
                href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link pl-3 pr-3 text-left btn btn-outline-pink active"
                href="/signup">Sign up</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default HeaderNavBar