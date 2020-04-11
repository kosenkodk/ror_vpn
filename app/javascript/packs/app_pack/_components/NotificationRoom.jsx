import React from 'react'
import { connect } from 'react-redux'
import { Messages, MessageForm } from './'
import consumer from 'channels/consumer'
import { FormDataAsJsonFromEvent } from '../_helpers'
// import { prepareAttachmentForJsonApiAsync } from '../_helpers'
import { globalActions } from '../_actions'

class NotificationRoom extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      message_text: '',
    }
    this.notificationChannel = ''
    this.onMessageFormSubmit = this.onMessageFormSubmit.bind(this)
  }

  async onMessageFormSubmit(e, item) {
    e.preventDefault()
    let jsonData = FormDataAsJsonFromEvent(e)
    // if (this.props.attachments && this.props.attachments.attachmentsForApi) {
    //   // const items = await Promise.all([...this.props.attachments.files].map(async (item) => await prepareAttachmentForJsonApiAsync(item)));
    //   const items = await Promise.all(this.props.attachments.attachmentsForApi)
    //   jsonData['attachments'] = items
    // }
    this.notificationChannel.reply(jsonData)
    // this.notificationChannel.reply({ message_user_id: jsonData.message_user_id, message_text: jsonData.message_text })
    this.props.dispatch(globalActions.clearAttachments());
  }

  componentDidMount() {
    const user_id = this.props.id

    this.notificationChannel = consumer.subscriptions.create(
      {
        channel: 'NotificationsChannel',
        room: `Room${user_id}`
      },
      {
        received: data => {
          switch (data.type) {
            case 'message':
              const messages = [data.message, ...this.state.messages]
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
          return this.perform("load", { user_id: user_id })
        },
      }
    );
    // this.notificationChannel.load();
  }

  loadChat(e) {
    e.preventDefault()
    this.notificationChannel.load()
  }

  render() {
    const { messages } = this.state
    // const { item } = this.props
    return (
      <React.Fragment>
        <MessageForm onMessageFormSubmit={this.onMessageFormSubmit} />
        {/* load chat history <button className="btn btn-outline-info"
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
  const { attachments } = state.global
  const { loading, item } = state.tickets
  return {
    loading, item, attachments
  }
}

const connectedComponent = connect(mapStateToProps)(NotificationRoom)
export { connectedComponent as NotificationRoom }
