import React from 'react'
import { connect } from 'react-redux'
// import { I18n } from 'helpers'
import { Messages, MessageForm } from './'
import consumer from 'channels/consumer'

class ChatRoom extends React.Component {

  constructor(props) {
    super(props)
    this.state = { messages: [], message_text: '' }

    this.onMessageFormSubmit = this.onMessageFormSubmit.bind(this)
  }

  onMessageFormSubmit(e, item) {
    e.preventDefault()
    let formData = new FormData(e.target)
    let jsonData = {}
    formData.forEach((value, key) => { jsonData[key] = value });
    consumer.subscriptions.subscriptions[0].reply(jsonData);
    // consumer.subscriptions.subscriptions[0].reply({ message_user_id: jsonData.message_user_id, message_text: jsonData.message_text });
  }

  componentDidMount() {
    const ticket_id = this.props.id || this.props.item && this.props.item.id
    consumer.subscriptions.create(
      {
        channel: 'ChatChannel',
        room: `Room${ticket_id}`
      },
      {
        received: data => {
          switch (data.type) {
            case 'message':
              const messages = [data.message, ...this.state.messages]
              // this.setState({ messages: this.state.messages.concat(data.message) })
              this.setState({ messages: messages })
              break
            case 'messages':
              this.setState({ messages: data.messages })
              break
          }
        },
        reply: function (data) { return this.perform("reply", data) },
        load: function () { return this.perform("load", { ticket_id: ticket_id }) },
        // load: function () { return this.perform("load") },
      }
    )
  }

  loadChat(e) {
    e.preventDefault();
    consumer.subscriptions.subscriptions[0].load();
  }

  render() {
    const { messages } = this.state
    return (
      <div>
        <MessageForm onMessageFormSubmit={this.onMessageFormSubmit} />
        <button className="load-button"
          onClick={this.loadChat.bind(this)}>
          Load Chat History
        </button>
        <Messages items={messages} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loading, item } = state.tickets
  return {
    loading, item
  }
}

const connectedComponent = connect(mapStateToProps)(ChatRoom)
export { connectedComponent as ChatRoom }
