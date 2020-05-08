import React from 'react'
import Features from '../_sections/Features'
import ProductWithPricingBtn from '../_sections/ProductWithPricingBtn'
import Reviews from '../_sections/Reviews'
import SecurityAndTrust from '../_sections/SecurityAndTrust'
import { AppDownloads } from '../_sections/AppDownloads'

class Home extends React.Component {
  render() {
    return (
      <div id="home" className="row home">
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