import React from 'react'
import PhoneImage from 'images/phone'
import I18n from 'i18n-js/index.js.erb'

class ProductWithPricingBtn extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-6 col-xs-offset-3 col-sm-5 col-md-5 d-block d-md-none">
          <img src={PhoneImage} className="img-fluid" alt="" />
        </div>
        <div className="col-xs-12 col-sm-7 col-md-6">
          <h1 className="featurette-heading">
            Take control of who has access to your private data
    </h1>
          <p className="lead">{I18n.t('vegaVPN')} encrypts your internet activity, shielding you from hackers, ISP's and everyone
            else who has
      no business recording what you haven't chosen to share.</p>
          <a href="#" className="btn btn-outline-primary "><span className=" 	glyphicon glyphicon-circle-arrow-right"></span>View
      pricing &#8594;</a>
        </div>
        <div className="col-md-6 d-none d-md-block">
          <img src={PhoneImage} className="img-fluid" alt="" />
        </div>
      </div>
    )
  }
}
export default ProductWithPricingBtn