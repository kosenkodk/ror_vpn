import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { pageActions, ticketActions } from '../_actions';
import { TicketForm } from './TicketForm';
import { urls } from 'config';
import { fileToBase64, FormDataAsJsonFromEvent } from '../_helpers';
import { I18n } from 'helpers';
import { BackButtonWithTitle, AttachmentPreview } from '../_components/admin';

class TicketsNewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      files: [],
      imagePreviews: []
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
    // prepare attachment(-s) for json api
    if (this.state.file) {
      jsonData['attachment2'] = await this.prepareAttachmentForJsonApi(this.state.file);
    } else if (this.state.files) {
      const promises = [...this.state.files].map(async (item) => await this.prepareAttachmentForJsonApi(item));
      jsonData['attachments'] = await Promise.all(promises)
    }
    this.props.dispatch(ticketActions.add(jsonData));
  }

  async prepareAttachmentForJsonApi(file) {
    return fileToBase64(file, file).then(result => {
      return {
        type: file.type,
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        file: result
      }
    });
  }

  onFileChange(e) {
    e.preventDefault();
    this.setState({ file: e.target.files[0] });
  }

  onFilesChange(e, imagePreviews) {
    e.preventDefault();
    this.setState({
      files: e.target.files,
      imagePreviews: imagePreviews
    });
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
          <div className="col-md-4 col-xl-5">
            <AttachmentPreview items={this.state.imagePreviews} />
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