import React from 'react'
import Features from '../Features'
import ProductWithPricingBtn from '../sections/ProductWithPricingBtn'
import Reviews from '../sections/Reviews'
import SecurityAndTrust from '../sections/SecurityAndTrust'
import AppDownloads from '../sections/AppDownloads'

class Home extends React.Component {
  render() {
    return (
      <div className="row">{/* <React.Fragment> */}
        <div className="container">
          <ProductWithPricingBtn />
          <Reviews />
          <SecurityAndTrust />
          <Features features={this.props.features} />
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
export default Home