import React from 'react'
import icUnreadSrc from 'images/icons/ic_unread.svg'
import { NavHashLink } from 'react-router-hash-link'

class Notifications extends React.Component {
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
                  {item.url && <NavHashLink to={item.url}> {I18n.t('buttons.view')}</NavHashLink>}
                </td>
                <td className="text-right notifications_item-date">
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
export { Notifications }