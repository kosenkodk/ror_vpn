import React from 'react'

class Notifications extends React.Component {
  render() {
    const { notifications } = this.props
    return (
      <table className="table text-left">
        {(notifications && (notifications.length > 0)) ?
          <tbody>
            {notifications.map((item, index) =>
              <tr key={`notification${index}`}>
                <td className="text-left">
                  {!item.is_read && '+'}
                  {item.title || item.text}
                </td>
                <td className="text-right notifications-item-date">
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