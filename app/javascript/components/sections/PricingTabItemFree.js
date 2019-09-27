import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import icon from 'images/icons/icon_checkbox_on'

class PricingTabItemFree extends React.Component {

  render() {
    const { item } = this.props;
    let features = item.features.split(',')
    let sizeHalf = features.length > 0 ? features.length / 2 : 0

    let featureList = features.slice(0, sizeHalf)
    let featureList2 = features.slice(sizeHalf, item.features.length)

    return (
      <React.Fragment>
        <div class="card mb-3 active">
          {/* <!-- <div class="card-header">
          </div> --> */}
          <div class="card-body">

            <h1 class="card-title pricing-card-title">Free</h1>
            <span class="text-sm-1 align-text-top pt-n5">Per month</span>
            <h5 class="card-title"></h5>
            <div class="row">

              <div class="col-md-4 offset-0">
                <ul class="text-left list-unstyled">
                  {
                    featureList.map((feature, index) => (
                      <li key={index}><img src={icon} class='img-fluid' alt='' /> {feature} </li>
                    ))
                  }
                </ul>
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4 offset-0">
                <ul class="text-left list-unstyled">
                  {
                    featureList2.map((feature, index) => (
                      <li key={index}><img src={icon} class='img-fluid' alt='' /> {feature} </li>
                    ))
                  }
                </ul>
              </div>

            </div>
          </div>

          {/* <!-- <div class="card-footer">
          </div> --> */}
        </div>
      </React.Fragment >
    )
  }

}
export default PricingTabItemFree