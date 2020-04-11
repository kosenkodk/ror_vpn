import React from 'react';
import { NavHashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { urls } from 'config';
import { Link } from 'react-router-dom';
import notificationSrc from 'images/admin/notification.svg';
import notificationNewSrc from 'images/admin/notification_new.svg';
import { NotificationRoom } from '../../_components';
import { history } from '../../_helpers';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpenNotifications: false }
  }

  signOut = (e) => {
    this.props.dispatch(userActions.logout());
    e.preventDefault();
  }

  openNotifications = (e) => {
    e.preventDefault();

    // let jsonData = FormDataAsJsonFromEvent(e)
    // this.notificationChannel.reply(jsonData)

    // this.setState({ isOpenNotifications: true });
    this.setState({ isOpenNotifications: !this.state.isOpenNotifications });
  }

  closeNotifications = (e) => {
    e.preventDefault();
    this.setState({ isOpenNotifications: false });
  }

  viewAllNotifications = (e) => {
    e.preventDefault()
    history.push(urls.notifications.path)
    this.closeNotifications(e)
  }

  render() {
    const { loggedIn, user, title } = this.props;

    return (
      <nav className="nav justify-content-end d-flex align-items-center">
        <li className="nav-item mr-auto">
          <h1 className="p-0 m-0 mt-xl-2">{title}</h1>
        </li>
        <li className="nav-item d-none d-sm-block">
          <a id="emailInHeader" className="nav-link text-white">{user && user.email}</a>
        </li>
        <li className="nav-item">
          <NavHashLink to={urls.user_account.path} activeClassName="" className="">
            <img src={urls.user_account.imgSrc} className="img-fluid" alt="User's Profile" />
          </NavHashLink>
        </li>
        <li className="nav-item">
          <NavHashLink to={urls.notifications.path} activeClassName="" className="nav-link">
            <img onClick={this.openNotifications} src={urls.notifications.imgSrc} className="img-fluid" alt="User's Notification" />
          </NavHashLink>
          <div className={`notifications ${this.state.isOpenNotifications ? 'show' : 'fade'}`} role="tooltip" id="popover496112" x-placement="bottom">
            <div className="notifications-arrow"></div>
            <div className="row notifications-header">
              <h6 className="col text-left">Notifications</h6>
              <div className="col text-right">
                <h6 onClick={this.closeNotifications} className="notifications-close">x</h6>
              </div>
            </div>
            <div className="notifications-body">
              {/* <NotificationRoom></NotificationRoom> */}
              <table className="table text-left">
                <tbody>
                  {user && user.messages && user.messages.map((item, index) =>
                    <tr key={`notification${index}`}>
                      <td className="text-left">
                        {item.title}
                      </td>
                      <td className="text-right notifications-item-date">
                        {item.created_at_humanize}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button onClick={this.viewAllNotifications} className="btn btn-pink btn-block">See all incoming activities</button>
          </div>
        </li>
        <li className="nav-item">
          <NavHashLink to={urls.signout.path} onClick={this.signOut} activeClassName="" className="nav-link btn btn-sm btn-black">{urls.signout.name}</NavHashLink>
        </li>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { title } = state.page;
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn, user, title
  };
}

const connectedPage = connect(mapStateToProps)(Header);
export { connectedPage as Header };
