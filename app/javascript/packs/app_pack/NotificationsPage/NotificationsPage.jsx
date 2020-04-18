import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { notificationActions } from '../_actions'
import { Paginator } from '../_components'
import { Notifications } from '../NotificationsPage/Notifications'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

class NotificationsPage extends React.Component {
  constructor(props) {
    super(props)
    this.onPageChange = this.onPageChange.bind(this)
  }

  onPageChange(e, page) {
    this.props.dispatch(notificationActions.getNotifications(`page=${page}&per_page=${this.props.per_page}`))
    e.preventDefault()
  }

  componentDidMount() {
    this.props.dispatch(notificationActions.getNotifications(`page=${this.props.page}&per_page=${this.props.per_page}`))
  }

  componentWillUnmount() {
    this.props.dispatch(notificationActions.setPage(1))
  }

  render() {
    const { notifications, pages, page } = this.props
    const popover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">Popover right</Popover.Title>
        <Popover.Content>
          And here's some <strong>amazing</strong> content. It's very engaging.
          right?
        </Popover.Content>
      </Popover>
    );
    return (
      <div className="container-fluid notifications-page">
        <h1>{I18n.t('pages.notifications.title')}</h1>

        <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
          <Button variant="success">Click me to see</Button>
        </OverlayTrigger>

        <div className="row">
          <div className="col-md-8">
            <Notifications notifications={notifications} />
            <Paginator onPageChange={this.onPageChange} pageCurrent={page} pageTotal={pages} />
          </div>
        </div>
      </div>
    );
  }
}

NotificationsPage.defaultProps = {
  per_page: 11
}

function mapStateToProps(state) {
  const { notifications, pages, page } = state.notifications
  return {
    notifications, pages, page
  }
}

const connectedPage = connect(mapStateToProps)(NotificationsPage)
export { connectedPage as NotificationsPage }