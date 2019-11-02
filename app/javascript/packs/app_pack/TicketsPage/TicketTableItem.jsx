import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import TicketViewModal from './TicketViewModal'
import { urls } from 'config'

class TicketTableItem extends React.Component {
  render() {
    return (
      <tr>
        <td>
          {/* <TicketViewModal onFormSubmit={this.props.onFormSubmit} isEdit={false} {...this.props} /> */}
          <Link to={`${urls.tickets.path}/${this.props.id}`} className='btn btn-sm btn-outline-info'>View</Link>
        </td>
        {/*
        <td>
          <TicketViewModal onFormSubmit={this.props.onFormSubmit} isEdit={true} {...this.props} />
          <button onClick={(e) => this.isEditHandler(e, true)} className='btn btn-sm btn-outline-warning'>Edit</button>
        </td>
        <td>
          <button onClick={(e) => this.props.onClose(e, this.props)} className='btn btn-sm btn-outline-danger'>Close</button>
          <button onClick={(e) => this.props.onDeleteItem(e, this.props)} className='btn btn-sm btn-outline-danger'>Delete</button>
        </td>
        */}

        <td>{this.props.department && this.props.department.title}</td>
        <td>
          {this.props.status === 'closed' ? <span className="btn btn-sm btn-outline-success btn-block">{this.props.status}</span>
            : <span className="btn btn-sm btn-outline-secondary btn-block">{this.props.status}</span>

          }</td>
        <td><Link to={`${urls.tickets.path}/${this.props.id}`} className='text-white'>{this.props.title}</Link></td>
        {/* <td>{this.props.text}</td> */}
        <td>{this.props.created_at_humanize}</td>
        <th scope="row"><Link to={`${urls.tickets.path}/${this.props.id}`} className='text-white'>{this.props.no}</Link></th>

      </tr>
    );
  }
}

TicketTableItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  // status: PropTypes.string,
  department: PropTypes.object,
}

export default TicketTableItem
