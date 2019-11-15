import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { pageActions, ticketActions } from '../_actions'
import { urls } from 'config'
import { I18n } from 'helpers'
import { ChatRoom, Messages } from '../_components'

class TicketsViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
    }
  }

  componentDidMount() {
    this.props.dispatch(ticketActions.view(this.state.id))
    this.props.dispatch(pageActions.setTitle(this.getTitle()))
  }

  componentWillUpdate() {
    this.props.dispatch(pageActions.setTitle(this.getTitle()))
  }

  getTitle() {
    return `Ticket #${this.state.id}`
  }

  render() {
    const { item, loggedIn } = this.props

    return (
      <div id="tickets_new" className="row mb-4 pb-1">
        <div className="col-12">
          <div className="container-section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-6">
                  <h5 className="mt-2">{I18n.t('pages.tickets.form.title')}: {item && item.title}</h5>
                </div>
                <div className="col-xs-6 ml-auto">
                  <Link to={urls.tickets.path} className="btn btn-sm btn-outline-primary">Back</Link>
                </div>
              </div>
            </div>

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