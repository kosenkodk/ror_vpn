import React from "react"
import PropTypes from "prop-types"
class Feature extends React.Component {
  render () {
    return (
      <React.Fragment>
        Title: {this.props.title}
        Subtitle: {this.props.subtitle}
        Text: {this.props.text}
      </React.Fragment>
    );
  }
}

Feature.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.node
};
export default Feature
