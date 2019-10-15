import React from 'react'
// import { Link } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import { urls } from 'config'

class Sidebar extends React.Component {
  render() {
    return (
      <ul className="sidebar list-group shadow-vega bg-vega mb-4">
        {/* <li className="list-group-item">SETTINGS</li> */}
        <li className="list-group-item"><Link to={urls.coming_soon.path}>Dashboard</Link></li>
        <li className="list-group-item"><Link to={urls.coming_soon.path}>Account</Link></li>
        <li className="list-group-item"><Link to={urls.tickets.path}>{urls.tickets.name}</Link></li>
        <li className="list-group-item"><Link to={urls.coming_soon.path}>Payment</Link></li>
        <li className="list-group-item"><Link to={urls.coming_soon.path}>Downloads</Link></li>
        <li className="list-group-item"><Link to={urls.coming_soon.path}>Refer Friends</Link></li>

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