import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";

class Ticket extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { tickets } = this.state;
    return (
      <div id="tickets" className="tickets row">
        {this.props.title}
      </div>
    );
  }

  componentDidMount() {
  }
}

export default withRouter(Ticket)
