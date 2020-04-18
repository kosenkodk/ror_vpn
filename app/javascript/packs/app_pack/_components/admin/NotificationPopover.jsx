import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { connect } from 'react-redux';
import { notificationActions, userActions } from '../../_actions';
import { urls } from 'config';
import { history } from '../../_helpers';

import { NotificationPopup } from '../../_components/admin';


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

  closeNotifications = (e) => {
    e.preventDefault();
    this.setState({ isOpenNotifications: false });
  }

  viewAllNotifications = (e) => {
    e.preventDefault()
    history.push(urls.notifications.path)
    this.closeNotifications(e)
  }

  componentDidMount() {
    this.props.dispatch(notificationActions.getNotifications('per_page=5'))
  }

  render() {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
          And here's some <strong>amazing</strong> content. It's very engaging.
          right?
          <NotificationPopup />

        </Popover.Content>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
        <Button variant="success">Notifications</Button>
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
