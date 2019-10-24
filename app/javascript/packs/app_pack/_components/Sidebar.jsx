import React from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import { urls } from 'config'
import { history } from '../_helpers'

class Sidebar extends React.Component {

  getNavLinkClass = (path) => {
    return history.location.pathname === path ? 'active' : '';
  }

  render() {
    console.log(this.props.items)
    const { items } = this.props
    return (
      <ul className="sidebar list-group shadow-vega bg-vega mb-4">
        {items ? items.map(item =>
          <Link key={item.path} smooth to={item.path} activeClassName="active">
            <li className="list-group-item">{item.name}</li>
          </Link>
        )
          :
          <React.Fragment>
            <Link smooth to={urls.user_dashboard.path} activeClassName="active">
              <li className="list-group-item">{urls.user_dashboard.name}</li>
            </Link>
            <Link smooth to={urls.user_account.path} activeClassName="active">
              <li className="list-group-item">
                {urls.user_account.name}
              </li>
            </Link>
            <Link smooth to={urls.tickets.path} activeClassName="active">
              <li className="list-group-item">{urls.tickets.name}</li>
            </Link>
            <Link smooth to={urls.user_payment.path} activeClassName="active">
              <li className="list-group-item">{urls.user_payment.name}</li>
            </Link>
            <Link smooth to={urls.user_downloads.path} activeClassName="active">
              <li className="list-group-item">{urls.user_downloads.name}</li>
            </Link>
            <Link smooth to={urls.user_invite_friend.path} activeClassName="active">
              <li className="list-group-item">{urls.user_invite_friend.name}</li>
            </Link>
          </React.Fragment>
        }

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
      </ul >
    )
  }
}

export default Sidebar