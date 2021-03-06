import React from 'react'
import PropTypes from 'prop-types'
import Feature from './Feature'
import { withRouter } from "react-router-dom"

class Features extends React.Component {

  constructor(props) {
    super(props)
    let features = props.features && props.features.length > 0 ? props.features : []

    this.state = { features: features }
  }

  render() {
    const { features } = this.state;
    return (
      <div id="features" className="features row">
        {
          features.map(item => (
            <div key={item.id} className="col-xs-12 col-sm-6 col-md-4">
              <Feature {...item} />
            </div>
          ))
        }
      </div>
    );
  }

  componentDidMount() {
    if (this.props.features && this.props.features.length > 0) {
      // this.setState({ features: this.props.features })
      return;
    }

    const url = "api/v1/features";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ features: response }))
      .catch((err) => {
        console.log(err)
      });
  }

}

Features.propTypes = {
  features: PropTypes.array
};

export default withRouter(Features)