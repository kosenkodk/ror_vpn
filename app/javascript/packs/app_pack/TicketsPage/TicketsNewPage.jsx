import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { pageActions, ticketActions } from '../_actions';
import { TicketForm } from './TicketForm';
import { urls } from 'config';
import { fileToBase64, FormDataAsJsonFromEvent } from '../_helpers';
import { I18n } from 'helpers';
import { BackButtonWithTitle } from '../_components/admin';

class TicketsNewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      files: []
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFilesChange = this.onFilesChange.bind(this);
  }

  componentDidUpdate() {
    this.props.dispatch(pageActions.setTitle(I18n.t('nav_menu.tickets')));
  }

  componentDidMount() {
    this.props.dispatch(pageActions.setTitle(I18n.t('nav_menu.tickets')));
  }

  async onFormSubmit(e) {
    e.preventDefault();
    let jsonData = FormDataAsJsonFromEvent(e);
    // prepare attachment for json api
    if (this.state.file) {
      jsonData['attachment2'] = await this.prepareAttachmentForJsonApi(this.state.file);
      this.props.dispatch(ticketActions.add(jsonData));
    } else if (this.state.files) {

    } else {
      this.props.dispatch(ticketActions.add(jsonData));
    }
  }

  async prepareAttachmentForJsonApi() {
    return fileToBase64(this.state.file, this.state.file.name).then(result => {
      return {
        type: this.state.file.type,
        name: this.state.file.name,
        size: this.state.file.size,
        lastModified: this.state.file.lastModified,
        file: result
      }
    });
  }

  onFileChange(e) {
    e.preventDefault();
    this.setState({ file: e.target.files[0] });
  }

  onFilesChange(e) {
    e.preventDefault();
    this.setState({ files: e.target.files });
  }

  render() {
    const { items } = this.props
    return (
      <div id="" className="tickets tickets__new container-fluid">
        <BackButtonWithTitle title={I18n.t('pages.tickets.new')} url={urls.tickets.path} />
        <div className="row mt-xl-3">
          <div className="col-md-8 col-xl-7">
            <TicketForm onFilesChange={this.onFilesChange} onFileChange={this.onFileChange} onFormSubmit={this.onFormSubmit} departments={items} />
            {/* <TicketForm onFormSubmit={this.onFormSubmit} departments={items} /> */}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loading, items } = state.departments;
  return { loading, items };
}

const connectedApp = connect(mapStateToProps)(TicketsNewPage);
export { connectedApp as TicketsNewPage };