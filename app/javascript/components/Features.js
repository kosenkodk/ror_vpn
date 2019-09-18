import React from 'react'
import PropTypes from 'prop-types'
import Feature from './Feature'
class Features extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      features: []
    };
  }

  render() {
    const { features } = this.state;
    return (
      <React.Fragment>
        <div id="features" className="features row">
          {
            features.map(item => (
              <div key={item.id} className="col-xs-12 col-sm-6 col-md-4">
                <Feature {...item} />
              </div>
            ))
          }
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    if (this.state.features.count > 0) return;
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