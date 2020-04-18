import React from 'react'
import { connect } from 'react-redux'
import icUnreadSrc from 'images/icons/ic_unread.svg'
// import { Link } from 'react-router-dom'
import { I18n } from 'helpers'
import { history } from '../_helpers'
import { notificationActions } from '../_actions'

class Notifications extends React.Component {

  view(e, url) {
    e.preventDefault()
    history.push(url)
    this.props.dispatch(notificationActions.isOpen(false))
  }

  render() {
    const { notifications } = this.props
    return (
      <table className="table text-left">
        {(notifications && (notifications.length > 0)) ?
          <tbody>
            {notifications.map((item, index) =>
              <tr key={`notification${index}`}>
                <td className="notifications-status">
                  {!item.is_read &&
                    <img className="ic-unread" src={icUnreadSrc} />
                  }
                </td>
                <td className="text-left">
                  {item.title || item.text}
                  {/* {item.url && <Link id="view-ticket" to={item.url}> {I18n.t('buttons.view')} </Link>} */}
                  {item.url && <a id="view-ticket" href="#" value={item.url} onClick={(e) => this.view(e, item.url)}> {I18n.t('buttons.view')} </a>}
                </td>
                <td className="text-right notifications__item-date">
                  {item.created_at_humanize}
                </td>
              </tr>
            )}
          </tbody>
          :
          <tbody>
            <tr>
              <td>Notifications are not found</td>
            </tr>
          </tbody>
        }
      </table>
    );
  }
}

function mapStateToProps(state) {
  const { is_read_all, isOpen } = state.notifications
  return {
    is_read_all, isOpen,
  }
}

const connectedPage = connect(mapStateToProps)(Notifications)
export { connectedPage as Notifications }