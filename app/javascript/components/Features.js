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
              <Feature key={item.id} {...item} />
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