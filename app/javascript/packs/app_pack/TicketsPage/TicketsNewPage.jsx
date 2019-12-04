import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { pageActions, ticketActions } from '../_actions'
import { TicketForm } from './TicketForm'
import { urls } from 'config'
import { fileToBase64, FormDataAsJsonFromEvent } from '../_helpers'
import { I18n } from 'helpers'
import icArrowLeftSrc from 'images/accordion_menu/arrow_left.svg'

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

  componentDidMount() {
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
      <div id="tickets_new" className="tickets container-fluid mb-4 pb-1">
        <div className="d-flex">
          <div className="align-self-center">
            <Link to={urls.tickets.path} className="">
              <img src={icArrowLeftSrc} className="img-fluid" />
            </Link>
          </div>
          <div className="ml-2">
            <h4 className="mt-2 font-weight-bold">{I18n.t('pages.tickets.new')}</h4>
          </div>
        </div>
        <div className="row mt-xl-3">
          <div className="col-md-8 col-xl-7">
            <TicketForm onFileChange={this.onFileChange} onFormSubmit={this.onFormSubmit} departments={items} />
            {/* <TicketForm onFormSubmit={this.onFormSubmit} departments={items} /> */}
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