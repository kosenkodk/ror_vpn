import React from "react"
import PropTypes from "prop-types"
class Features extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>All Features</h2>
        <ul>
          {this.props.features.map(item => (
            <li key={item.id} > {`${item.title} ${item.subtitle}`}</li>
          ))
          }
        </ul>
      </React.Fragment>
    );
  }
}

Features.propTypes = {
  features: PropTypes.array
};
export default Features
