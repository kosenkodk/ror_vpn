import React from 'react'
import Features from '../Features'
import ProductWithPricingBtn from '../sections/ProductWithPricingBtn'

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <Features />
          <ProductWithPricingBtn />
          {/* // <%= render partial: 'shared/reviews_section_tab' %> */}
          {/* // <%= render partial: 'shared/security_and_trust' %> */}
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