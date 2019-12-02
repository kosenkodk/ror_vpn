import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { Message } from './Message'

class Messages extends React.Component {
  render() {
    const { items, user } = this.props
    // const { items } = this.state
    const emptyList = ''//<p>no previous messages found</p>

    return (
      <React.Fragment>
        {/* <h3>Messages</h3> */}
        {items && items.length > 0 ?
          items.map((item, index) =>
            <div key={`msg${item && item.id}_${index}`} className={`ticket__message ${index % 2 ? 'active' : ''}`}>
              <Message item={item} />
            </div>
          )
          : emptyList
        }
      </React.Fragment>
    )
  }
}

Messages.defaultProps = {
  items: []
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