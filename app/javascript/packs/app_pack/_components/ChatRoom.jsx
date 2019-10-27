import React from 'react'
import { connect } from 'react-redux'
// import { I18n } from '../_helpers'
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
    consumer.subscriptions.subscriptions[0].reply({ message_text: jsonData.message_text });
  }

  componentDidMount() {
    consumer.subscriptions.create(
      {
        channel: 'ChatChannel',
        // room: 'Room 1'
      },
      {
        received: data => {
          switch (data.type) {
            case 'message':
              this.setState({ messages: this.state.messages.concat(data.message) })
              break
            case 'messages':
              this.setState({ messages: data.messages })
              break
          }
        },
        // reply: (data) => this.perform('reply', data),
        // load: () => this.perform('load'),
        reply: function (data) { return this.perform("reply", data) },
        load: function () { return this.perform("load") },
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
  const { loading } = state.tickets
  return {
    loading
  }
}

const connectedComponent = connect(mapStateToProps)(ChatRoom)
export { connectedComponent as ChatRoom }
