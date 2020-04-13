import React from 'react'
// import { connect } from 'react-redux'
// import { I18n } from 'helpers'

class Notifications extends React.Component {

  render() {
    const { notifications } = this.props
    return (
      <table className="table text-left">
        {
          (notifications
            && (notifications.length > 0)
          ) ?
            <tbody>
              {notifications.map((item, index) =>
                <tr key={`notification${index}`}>
                  <td className="text-left">
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

// function mapStateToProps(state) {
//   return state
// }

// const connectedPage = connect(mapStateToProps)(Notifications)
// export { connectedPage as Notifications }

export { Notifications }