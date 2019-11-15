import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { pageActions, ticketActions } from '../_actions'
import { TicketForm } from './TicketForm'
import { urls } from 'config'
import { fileToBase64, FormDataAsJsonFromEvent } from '../_helpers'
import { I18n } from 'helpers'

class TicketsNewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }

  componentWillUpdate() {
    this.props.dispatch(pageActions.setTitle(I18n.t('nav_menu.tickets')));
  }

  onFormSubmit(e) {
    let jsonData = FormDataAsJsonFromEvent(e)
    // prepare attachment for json api
    if (this.state.file) {
      fileToBase64(this.state.file, this.state.file.name).then(result => {
        return {
          type: this.state.file.type,
          name: this.state.file.name,
          size: this.state.file.size,
          lastModified: this.state.file.lastModified,
          file: result
        }
      }).then(attachment_base64 => {
        jsonData['attachment2'] = attachment_base64
        this.props.dispatch(ticketActions.add(jsonData))
        return
      })
    } else {
      this.props.dispatch(ticketActions.add(jsonData))
    }
    e.preventDefault();
  }

  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
    e.preventDefault();
  }

  render() {
    const { items } = this.props
    return (
      <div id="tickets_new" className="row mb-4 pb-1">
        <div className="col-12">
          <div className="container-section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-6">
                  <h5 className="mt-2">New Ticket</h5>
                </div>
                <div className="col-xs-6 ml-auto">
                  {/* <Link to={urls.tickets.path} className="btn btn-outline-default"><h5>Back</h5></Link> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">

                <TicketForm onFileChange={this.onFileChange} onFormSubmit={this.onFormSubmit} departments={items} />
                {/* <TicketForm onFormSubmit={this.onFormSubmit} departments={items} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loading, items } = state.departments;
  return { loading, items }
}

const connectedApp = connect(mapStateToProps)(TicketsNewPage);
export { connectedApp as TicketsNewPage };