import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { connect } from 'react-redux';
import { notificationActions, userActions } from '../../_actions';
import { urls } from 'config';
import { history } from '../../_helpers';

import { NotificationPopup } from '../../_components/admin';

import notificationSrc from 'images/admin/notification.svg';
import notificationNewSrc from 'images/admin/notification_new.svg';

import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

class NotificationPopover extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpenNotifications: true }
  }

  openNotifications = (e) => {
    e.preventDefault();
    if (!this.props.is_read_all)
      this.props.dispatch(notificationActions.readAll())
    this.setState({ isOpenNotifications: !this.state.isOpenNotifications });
  }

  render() {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
          <NotificationPopup />
        </Popover.Content>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        {/* <Button variant="success">Notifications</Button> */}
        <NavHashLink to="#" activeClassName="" className="nav-link">
          <img id="notification_popup"
            // onClick={this.openNotifications}
            src={this.props.is_read_all ? notificationSrc : notificationNewSrc}
            className="img-fluid" alt="User's Notification" />
        </NavHashLink>
      </OverlayTrigger>
    );
  }
}

function mapStateToProps(state) {
  const { notifications, is_read_all } = state.notifications;
  return {
    notifications, is_read_all
  };
}

const connectedPage = connect(mapStateToProps)(NotificationPopover);
export { connectedPage as NotificationPopover };
