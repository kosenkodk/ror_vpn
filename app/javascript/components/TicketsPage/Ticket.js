import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link';

class Ticket extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <React.Fragment>
        <td>{this.props.title}</td>
        {/* <td>{this.props.text}</td> */}
        <td>{this.props.department}</td>
        <td>{this.props.status}</td>
        <td><Link to="#" className='btn btn-sm btn-outline-info'>Show</Link></td>
        <td><Link to="#" className='btn btn-sm btn-outline-warning'>Edit</Link></td>
        <td><Link to="#" className='btn btn-sm btn-outline-danger'>Destroy</Link></td>
      </React.Fragment>
    );
  }

  componentDidMount() {
  }
}

export default withRouter(Ticket)
