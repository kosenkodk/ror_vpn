import React from 'react'
// import { Link } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link'
import Routes from '../Routes'

class Sidebar extends React.Component {
  render() {
    return (
      <ul class="list-group bg-vega">
        <li class="list-group-item bg-transparent">SETTINGS</li>
        <li class="list-group-item bg-transparent"><Link to={Routes.coming_soon.path}>Dashboard</Link></li>
        <li class="list-group-item bg-transparent"><Link to={Routes.coming_soon.path}>Account</Link></li>
        <li class="list-group-item bg-transparent"><Link to={Routes.tickets.path}>{Routes.tickets.name}</Link></li>
        <li class="list-group-item bg-transparent"><Link to={Routes.coming_soon.path}>Payment</Link></li>
        <li class="list-group-item bg-transparent"><Link to={Routes.coming_soon.path}>Downloads</Link></li>
        <li class="list-group-item bg-transparent"><Link to={Routes.coming_soon.path}>Refer Friends</Link></li>

        {/* <!--
        <li class="list-group-item bg-transparent">Invoices</li>
        <li class="list-group-item bg-transparent"><Link to="#">Change Password</Link></li>
        <li class="list-group-item bg-transparent"><Link to="#">Sign Out</Link></li>
        -->

        <!-- <li class="list-group-item bg-transparent">VPN Accounts</li>
        <li class="list-group-item bg-transparent"><Link to="#">Update Profile</Link></li>
        <li class="list-group-item bg-transparent"><Link to="#">Change Password</Link></li>
        <li class="list-group-item bg-transparent"><Link to="#">Submit Ticket</Link></li>
        <li class="list-group-item bg-transparent"><Link to="#">Support Tickets</Link></li>
        <li class="list-group-item bg-transparent"><Link to="#">Invoice History</Link></li>
        <li class="list-group-item bg-transparent"><Link to="#">Delete Account</Link></li> --> */}
      </ul>
    )
  }
}

export default Sidebar