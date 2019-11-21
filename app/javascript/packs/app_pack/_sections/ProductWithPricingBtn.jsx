import React from 'react'
import PhoneImage from 'images/phone'
import { I18n } from 'helpers'
import { Link } from 'react-router-dom'

class ProductWithPricingBtn extends React.Component {
  render() {
    return (
      <div id="product_with_pricing" className="product_with_pricing row d-flex align-items-center mt-5">
        <div className="col-xs-6 col-xs-offset-3 col-sm-5 col-md-5 col-lg-4 d-block d-md-none">
          <img src={PhoneImage} className="img-fluid" alt="" />
        </div>
        <div className="col-xs-12 col-sm-7 col-md-6 col-lg-8 align-items-start">
          <h1 className="featurette-heading">
            Take control of who has access to your private data
          </h1>
          <p className="lead">{I18n.t('vegaVPN')} encrypts your internet activity, shielding you from hackers, ISP's and everyone
            else who has
      no business recording what you haven't chosen to share.</p>
          <Link to="/pricing" className="col-lg-3 btn btn-outline-primary">
            {I18n.t('buttons.view_pricing')} <span className="glyphicon glyphicon-circle-arrow-right">&#8594;</span>
          </Link>
        </div>
        <div className="col-md-6 col-lg-4 d-none d-md-block">
          <img src={PhoneImage} className="img-fluid" alt="" />
        </div>
      </div>
    )
  }
}
export default ProductWithPricingBtn