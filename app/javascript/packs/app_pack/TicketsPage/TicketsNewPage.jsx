import React from 'react';
import { connect } from 'react-redux';

import { globalActions, pageActions, ticketActions } from '../_actions';
import { TicketForm } from './TicketForm';
import { urls } from 'config';
import { FormDataAsJsonFromEvent } from '../_helpers';
import { I18n } from 'helpers';
import { BackButtonWithTitle, AttachmentPreview } from '../_components/admin';

class TicketsNewPage extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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
    jsonData['attachments'] = await Promise.all(this.props.attachments.attachmentsForApi);;
    this.props.dispatch(ticketActions.add(jsonData));
  }

  render() {
    const { departments } = this.props
    return (
      <div id="" className="tickets tickets__new container-fluid">
        <BackButtonWithTitle title={I18n.t('pages.tickets.new')} url={urls.tickets.path} />
        <div className="row mt-xl-3">
          <div className="col-md-8 col-xl-7">
            <TicketForm onFormSubmit={this.onFormSubmit} departments={departments} />
          </div>
          <div className="col-md-4 col-xl-5">
            <AttachmentPreview items={this.props.attachments} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { attachments } = state.global
  const { departments } = state.global;
  return { departments, attachments };
}

const connectedApp = connect(mapStateToProps)(TicketsNewPage);
export { connectedApp as TicketsNewPage };