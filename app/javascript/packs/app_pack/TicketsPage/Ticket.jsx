import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import TicketViewModal from './TicketViewModal'

class Ticket extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {/* <TicketViewModal onFormSubmit={this.props.onFormSubmit} isEdit={false} {...this.props} /> */}
          <Link to="#" className='btn btn-sm btn-outline-info'>Show</Link>
        </td>
        <td>
          {/* <TicketViewModal onFormSubmit={this.props.onFormSubmit} isEdit={true} {...this.props} /> */}
          {/* <button onClick={(e) => this.isEditHandler(e, true)} className='btn btn-sm btn-outline-warning'>Edit</button> */}
          <Link to="#" className='btn btn-sm btn-outline-warning'>Edit</Link>
        </td>
        <td>
          {/* <button onClick={(e) => this.props.onDeleteItem(e, this.props)} className='btn btn-sm btn-outline-danger'>Delete</button> */}
          <Link to="#" className='btn btn-sm btn-outline-danger'>Delete</Link>
        </td>

        <th scope="row">{this.props.no}</th>
        <td >{this.props.title}</td>
        {/* <td>{this.props.text}</td> */}
        <td>{this.props.department}</td>
        <td>{this.props.status}</td>
      </tr>
    );
  }
}

Ticket.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  status: PropTypes.number,
  department: PropTypes.number,
}

export default Ticket
