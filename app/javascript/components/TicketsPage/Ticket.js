import React from 'react'
// import PropTypes from 'prop-types'
// import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';
import TicketViewModal from './TicketViewModal'

class Ticket extends React.Component {

  constructor(props) {
    super(props);
  }

  // onFormSubmit(e, item) {
  // }

  render() {

    return (
      <tr>
        <th scope="row">{this.props.index + 1}</th>
        <td >{this.props.title}</td>
        {/* <td>{this.props.text}</td> */}
        <td>{this.props.department}</td>
        <td>{this.props.status}</td>
        <td>
          <TicketViewModal onFormSubmit={this.props.onFormSubmit} isEdit={false} {...this.props} />
          {/* <Link to="#" className='btn btn-sm btn-outline-info'>Show</Link> */}
        </td>
        <td>
          <TicketViewModal onFormSubmit={this.props.onFormSubmit} isEdit={true} {...this.props} />
          {/* <button onClick={(e) => this.isEditHandler(e, true)} className='btn btn-sm btn-outline-warning'>Edit</button> */}
        </td>
        <td><button onClick={(e) => this.props.onDeleteItem(e, this.props)} className='btn btn-sm btn-outline-danger'>Delete</button></td>
      </tr>
    );
  }

}

export default Ticket
