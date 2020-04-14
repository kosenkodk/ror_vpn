import React from 'react'
import icUnreadSrc from 'images/icons/ic_unread.svg'
import { NavHashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import { I18n } from 'helpers'
import { history } from '../_helpers'

class Notifications extends React.Component {

  viewTicket(e, url) {
    // viewTicket = (e, url) => {
    e.preventDefault()
    // console.log('viewticket', e.target.value, url)
    history.push(url)
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
                  {item.url && <Link id="view-ticket" to={item.url}> {I18n.t('buttons.view')} </Link>}
                  {/* {item.url && <a href="#" value={item.url} onClick={(e) => this.viewTicket(e, item.url)}> {I18n.t('buttons.view')} </a>} */}
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