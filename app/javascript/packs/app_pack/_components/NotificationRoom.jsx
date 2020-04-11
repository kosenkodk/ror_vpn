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
    // const { notifications } = this.state
    const { notifications } = this.props
    return (
      <React.Fragment>
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
        {/* <MessageForm onMessageFormSubmit={this.onMessageFormSubmit} /> */}
        {/* load chat history <button className="btn btn-outline-info"
          onClick={this.loadChat.bind(this)}>
          {I18n.t('pages.tickets.chat.load')}
        </button> */}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  // const { notifications } = state.global
  const { loading, item } = state.tickets
  return {
    loading, item
  }
}

const connectedComponent = connect(mapStateToProps)(NotificationRoom)
export { connectedComponent as NotificationRoom }
