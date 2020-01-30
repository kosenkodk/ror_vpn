import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { pageActions, ticketActions, globalActions } from '../_actions'
import { urls } from 'config'
import { I18n } from 'helpers'
import { ChatRoom, Messages } from '../_components'
import { BackButtonWithTitle } from '../_components/admin'

class TicketsViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      subTitle: ''
    }
  }

  componentDidUpdate() {
    this.setTitle()
  }

  componentDidMount() {
    this.props.dispatch(ticketActions.view(this.state.id))
    this.setTitle()
    this.setState({ subTitle: `${I18n.t("pages.tickets.form.title")}: ${I18n.t("pages.tickets.ticket")} ${this.state.id}` })
  }

  componentWillUnmount() {
    this.props.dispatch(globalActions.clearAttachments())
  }

  setTitle() {
    this.props.dispatch(pageActions.setTitle(this.getTitle()))
  }

  getTitle() {
    return `${I18n.t("pages.tickets.ticket")} #${this.state.id}`
  }

  render() {
    const { item, title } = this.props
    return (
      <div className="container-fluid">
        <div id="" className="tickets tickets__view row mb-4 pb-1">
          <div className="col-12">
            <BackButtonWithTitle title={`${I18n.t('pages.tickets.form.title')}: ${(item && item.title) || title}`} url={urls.tickets.path} />
            <ChatRoom id={this.state.id} messages={item && item.messages} />

            {/* initial ticket message with attachment */}
            {item && item.messages && <Messages items={item.messages} />}

            {/* ticket's thumbnails */}
            {/* {item && item.attachmentList && item.attachmentList.map(item =>
              <a className="" href={item.url}><img src={item.url} className="col-sm-6 col-md-4 img-fluid img-thumbnail" />{item.name}</a>
            )} */}

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { tickets, authentication } = state
  const { loading, item } = tickets
  const { loggedIn } = authentication
  return { loading, item, loggedIn }
}

TicketsViewPage.defaultProps = {
  title: ''
}

const connectedApp = connect(mapStateToProps)(TicketsViewPage)
export { connectedApp as TicketsViewPage }