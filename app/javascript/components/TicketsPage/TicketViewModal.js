import React from 'react'
// import PropTypes from 'prop-types'
// import { withRouter } from "react-router-dom";
// import { Link } from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';
// import { TicketForm } from './TicketForm'
// import I18n from 'i18n-js/index.js.erb'

class TicketViewModal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-sm btn-outline-info" data-toggle="modal" data-target="#exampleModalCenter">
          View
        </button>

        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">{this.props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* <TicketForm /> */}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-pink-dark" data-dismiss="modal">Close</button>
                {/* <button type="button" className="btn btn-outline-pink active">Save changes</button> */}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default TicketViewModal
