import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { featureActions } from '../_actions';

import Features from '../_sections/Features'
import ProductWithPricingBtn from '../_sections/ProductWithPricingBtn'
import Reviews from '../_sections/Reviews'
import SecurityAndTrust from '../_sections/SecurityAndTrust'
import { AppDownloads } from '../_sections/AppDownloads'

class HomePage extends React.Component {
  componentDidMount() {
    // this.props.dispatch(featureActions.getAll());
  }

  render() {
    const { user, features } = this.props;
    return (
      <div id="home" className="row home">
        <div className="container">
          <ProductWithPricingBtn />
          {/* <Reviews /> */}
          <SecurityAndTrust />
          {/* {features && features.items &&
            <Features features={features.items} />
          } */}
          <Features />
        </div>
        <div className="container-fluid bg2">
          <div className="container">
            <AppDownloads />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tickets, authentication } = state;
  const { user } = authentication;
  return {
    user,
    tickets
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };