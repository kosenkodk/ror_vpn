import React from 'react'
import PropTypes from 'prop-types'
// import { withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';
import TicketForm from './TicketForm'
import I18n from 'i18n-js/index.js.erb'

class TicketViewModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const idModal = `modalView${this.props.id}${this.props.isEdit}`
    const idModalTitle = `modalViewTitle${this.props.id}${this.props.isEdit}`

    return (
      <div>
        <button type="button" className={`btn btn-sm ${this.props.isEdit ? 'btn-outline-warning' : 'btn-outline-info'}`} data-toggle="modal" data-target={`#${idModal}`}>
          {this.props.isEdit ? I18n.t('buttons.edit') : I18n.t('buttons.view')}
        </button>

        <div className="modal fade" data-backdrop={false} id={idModal} tabIndex="-1" role="dialog" aria-labelledby={idModalTitle} aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={idModalTitle}>{this.props.title || ''}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body ">
                {
                  this.props.isEdit ?
                    <TicketForm isEdit={this.props.isEdit} onFormSubmit={this.props.onFormSubmit} {...this.props} />
                    : this.props.text
                }

              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-pink-dark" data-dismiss="modal">{I18n.t('buttons.close')}</button>
                {this.props.isEdit && <button type="button" className="btn btn-outline-pink active">{I18n.t('buttons.save')}</button>}
              </div> */}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
TicketViewModal.propTypes = {
  // id: PropTypes.number
}
export default TicketViewModal
