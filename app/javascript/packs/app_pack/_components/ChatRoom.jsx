import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
import { Messages, MessageForm } from './'
import consumer from 'channels/consumer'
import { FormDataAsJsonFromEvent } from '../_helpers';

class ChatRoom extends React.Component {

  constructor(props) {
    super(props)
    this.state = { messages: [], message_text: '' }
    this.chatChannel = ''
    this.onMessageFormSubmit = this.onMessageFormSubmit.bind(this)
  }

  onMessageFormSubmit(e, item) {
    e.preventDefault();
    this.chatChannel.reply(FormDataAsJsonFromEvent(e));
    // this.chatChannel.reply({ message_user_id: jsonData.message_user_id, message_text: jsonData.message_text });
  }

  componentDidMount() {
    const ticket_id = this.props.id
    // const ticket_id = this.props.item && this.props.item.id

    this.chatChannel = consumer.subscriptions.create(
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
        reply: function (data) {
          return this.perform("reply", data)
        },
        load: function () {
          return this.perform("load", { ticket_id: ticket_id })
        },
      }
    );
    // this.chatChannel.load();
  }

  loadChat(e) {
    e.preventDefault();
    this.chatChannel.load();
  }

  render() {
    const { messages } = this.state
    // const { item } = this.props
    return (
      <React.Fragment>
        <MessageForm onMessageFormSubmit={this.onMessageFormSubmit} />
        {/* <button className="btn btn-outline-info"
          onClick={this.loadChat.bind(this)}>
          {I18n.t('pages.tickets.chat.load')}
        </button> */}
        <div className="mt-3 mb-3">
          <div className="border border-gray" />
          {/* <Messages items={item && item.messages} /> */}
          <Messages items={messages} />
        </div>
      </React.Fragment>
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
