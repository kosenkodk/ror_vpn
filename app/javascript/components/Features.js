import React from "react"
import PropTypes from "prop-types"

class Features extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      features: []
    };
  }

  render() {
    // const { features } = this.state;
    return (
      <React.Fragment>
        <div id="features" className="features row">
          {this.state.features.map(item => (
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

  componentDidMount() {
    const url = "api/v1/features";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ features: response }))
      .catch(() => this.props.history);
  }

}

Features.propTypes = {
  features: PropTypes.array
};

export default Features