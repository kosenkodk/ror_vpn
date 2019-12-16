import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { pageActions, ticketActions } from '../_actions'
import { urls } from 'config'
import { I18n } from 'helpers'
import { ChatRoom, Messages } from '../_components'
import icArrowLeftSrc from 'images/accordion_menu/arrow_left.svg'
import { BackButtonWithTitle } from '../_components/admin';

class TicketsViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      subTitle: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(ticketActions.view(this.state.id))
    this.setTitle()
    this.setState({ subTitle: `${I18n.t("pages.tickets.form.title")}: Ticket ${this.state.id}` })
  }

  UNSAFE_componentWillUpdate() {
    this.setTitle()
  }

  setTitle() {
    this.props.dispatch(pageActions.setTitle(this.getTitle()))
  }

  getTitle() {
    return `Ticket ${this.state.id}`
  }

  render() {
    const { item, title } = this.props
    return (
      <div className="container-fluid">
        <div id="tickets_new" className="tickets row mb-4 pb-1">
          <div className="col-12">
            {/* <BackButtonWithTitle title={this.state.subTitle} url={urls.tickets.path} /> */}
            <BackButtonWithTitle url={urls.tickets.path} >
              <h4 className="mt-2 font-weight-bold">{this.state.subTitle}</h4>
            </BackButtonWithTitle>
            <ChatRoom id={this.state.id} messages={item && item.messages} />
            {/* initial ticket message with attachment */}
            {item && item.messages && <Messages items={item.messages} />}
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

const connectedApp = connect(mapStateToProps)(TicketsViewPage)
export { connectedApp as TicketsViewPage }