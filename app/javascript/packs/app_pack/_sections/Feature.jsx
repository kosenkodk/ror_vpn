import React from "react"
import PropTypes from "prop-types"

class Feature extends React.Component {

  render() {
    return (
      <div key={this.props.id} className="card">
        <div className="card-header">
          {/* <img src={this.props.icon_url} className="card-img-top" alt="" /> */}
          <img src={this.props.icon_url} className="img-fluid" alt="" />
          <h5 className="card-title">{this.props.title}</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">{this.props.subtitle}</h5>
          <p className="card-text">{this.props.text}</p>
        </div>
      </div>
    );
  }
}

Feature.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon_url: PropTypes.string,
  text: PropTypes.node
};

export default Feature
