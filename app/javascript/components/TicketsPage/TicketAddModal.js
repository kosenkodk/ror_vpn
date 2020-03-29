import React from 'react'
import PropTypes from 'prop-types'
// import { withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';
import TicketForm from './TicketForm'
import { I18n } from 'helpers'

class TicketAddModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const idModal = `modalAdd${this.props.id}${this.props.isEdit}`
    const idModalTitle = `modalAddTitle${this.props.id}${this.props.isEdit}`

    return (
      <div>
        <button type="button" className="btn btn-sm btn-outline-success" data-toggle="modal" data-target={`#${idModal}`}>
          {I18n.t('buttons.new')}
        </button>

        <div className="modal fade" data-backdrop={false} id={idModal} tabIndex="-1" role="dialog" aria-labelledby={idModalTitle} aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={idModalTitle}>New Ticket</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body ">
                <TicketForm isEdit={this.props.isEdit} onFormSubmit={this.props.onFormSubmit} {...this.props} />
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-pink-dark" data-dismiss="modal">{I18n.t('buttons.close')}</button>
                <button type="button" className="btn btn-outline-pink active">{I18n.t('buttons.save')}</button>
              </div> */}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
TicketAddModal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}
export default TicketAddModal
