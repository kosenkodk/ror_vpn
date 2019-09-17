import React from "react"
import PropTypes from "prop-types"
class Features extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="features" className="features row">
          {this.props.features.map(item => (
            <div key={item.id} className="col-xs-12 col-sm-6 col-md-4">
              <div className="card">
                <div className="card-header">
                  {/* <img src="assets/icons/ic_facebook.png" className="card-img-top" alt="..." /> */}
                  <img src={item.icon_url} />
                  <h5 className="card-title">{item.title}</h5>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.subtitle}</h5>
                  <p className="card-text">{item.text}</p>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </React.Fragment>
    );
  }
}

Features.propTypes = {
  features: PropTypes.array
};
export default Features