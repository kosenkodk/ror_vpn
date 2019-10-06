import React from 'react'
// import PropTypes from 'prop-types'
// import { withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';
// import { TicketForm } from './TicketForm'
import I18n from 'i18n-js/index.js.erb'

class TicketEditModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-sm btn-outline-info" data-toggle="modal" data-target={`#modalEdit${this.props.id}`}>
          {I18n.t('buttons.view')}
        </button>

        <div className="modal fade" id={`modalEdit${this.props.id}`} tabIndex="-1" role="dialog" aria-labelledby={`modalEditTitle${this.props.id}`} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`modalEditTitle${this.props.id}`}>{this.props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.text}
                {/* <TicketForm /> */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-pink-dark" data-dismiss="modal">{I18n.t('buttons.close')}</button>
                {/* <button type="button" className="btn btn-outline-pink active">{I18n.t('buttons.save')}</button> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default TicketEditModal
