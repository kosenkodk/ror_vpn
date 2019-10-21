import React from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import { urls } from 'config'
import { history } from '../_helpers'

class Sidebar extends React.Component {
  getNavLinkClass = (path) => {
    return history.location.pathname === path ? 'active' : '';
  }

  render() {
    return (
      <ul className="sidebar list-group shadow-vega bg-vega mb-4">
        {/* <li className="list-group-item">SETTINGS</li> */}
        <li className="list-group-item"><Link to={urls.coming_soon.path} activeClassName="active" >Dashboard</Link></li>
        <li className="list-group-item"><Link to={urls.coming_soon.path} activeClassName="active" >Account</Link></li>
        <li className={`list-group-item ${this.getNavLinkClass(urls.tickets.path)}`}><Link to={urls.tickets.path} activeClassName="active" >{urls.tickets.name}</Link></li>
        <li className="list-group-item"><Link to={urls.coming_soon.path} activeClassName="active" >Payment</Link></li>
        <li className="list-group-item"><Link to={urls.coming_soon.path} activeClassName="active" >Downloads</Link></li>
        <li className="list-group-item"><Link to={urls.coming_soon.path} activeClassName="active" >Refer Friends</Link></li>

        {/* <!--
        <li className="list-group-item">Invoices</li>
        <li className="list-group-item"><Link to="#">Change Password</Link></li>
        <li className="list-group-item"><Link to="#">Sign Out</Link></li>
        -->

        <!-- <li className="list-group-item">VPN Accounts</li>
        <li className="list-group-item"><Link to="#">Update Profile</Link></li>
        <li className="list-group-item"><Link to="#">Change Password</Link></li>
        <li className="list-group-item"><Link to="#">Submit Ticket</Link></li>
        <li className="list-group-item"><Link to="#">Support Tickets</Link></li>
        <li className="list-group-item"><Link to="#">Invoice History</Link></li>
        <li className="list-group-item"><Link to="#">Delete Account</Link></li> --> */}
      </ul>
    )
  }
}

export default Sidebar