import React from 'react'
import { connect } from 'react-redux'
// import { I18n } from '../_helpers'

class Messages extends React.Component {
  render() {
    const { items } = this.props
    const messageList = items.map(item =>
      <div key={`msg${item.id}`}>
        {item.text}
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
  const { loading } = state.tickets
  return {
    loading
  }
}

const connectedForm = connect(mapStateToProps)(Messages)
export { connectedForm as Messages }