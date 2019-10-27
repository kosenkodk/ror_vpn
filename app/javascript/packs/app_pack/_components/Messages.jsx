import React from 'react'
import { connect } from 'react-redux'
// import { I18n } from 'helpers'

class Messages extends React.Component {

  getUserNameOrEmailFromMessage(message) {
    let name = ''
    try {
      const current_user = this.props.user
      const user = message.user
      name = current_user.id === user.id ? 'You' : user.email
      // name = current_user.email === user.email ? 'You' : user.email
    } catch (e) { }
    return name
  }

  render() {
    const { items, user } = this.props
    // const { items } = this.state
    const messageList = items.map((item, index) =>
      <div key={`msg${item.id}#${index}`}>
        from {this.getUserNameOrEmailFromMessage(item)} at {item.created_at}
        <p>message: {item.text}</p>
      </div>
    )
    const emptyList = <div>No data</div>

    return (
      <div>
        <h3>Messages</h3>
        {items.length > 0 ? messageList : emptyList}
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { user } = state.authentication
  const { loading } = state.tickets
  return {
    user,
    loading
  }
}

const connectedForm = connect(mapStateToProps)(Messages)
export { connectedForm as Messages }