import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { globalActions } from '../_actions'

class Notifications extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.dispatch(globalActions.getNotifications(12))
  }

  render() {
    const { notifications } = this.props
    return (
      <table className="table text-left">
        <tbody>
          {notifications && notifications.map((item, index) =>
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
      </table>
    );
  }
}

function mapStateToProps(state) {
  // const { notifications } = state.global
  // return {
  //   notifications
  // }
  return state
}

const connectedPage = connect(mapStateToProps)(Notifications)
export { connectedPage as Notifications }