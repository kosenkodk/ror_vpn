import React from 'react'
import Features from '../Features'
import ProductWithPricingBtn from '../sections/ProductWithPricingBtn'
import Reviews from '../sections/Reviews'
import SecurityAndTrust from '../sections/SecurityAndTrust'

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <ProductWithPricingBtn />
          <Reviews />
          <SecurityAndTrust />
          <Features />
        </div>
        <div className="container-fluid bg2">
          <div className="container">
            {/* // <%= render partial: 'shared/app_downloads' %> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Home