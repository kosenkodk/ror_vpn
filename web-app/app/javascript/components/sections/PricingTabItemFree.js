import React from 'react'
import { I18n } from 'helpers'
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
        <div className="card mb-3 active">
          {/* <!-- <div className="card-header">
          </div> --> */}
          <div className="card-body">

            <h1 className="card-title pricing-card-title">Free</h1>
            <span className="text-sm-1 align-text-top pt-n5">Per month</span>
            <h5 className="card-title"></h5>
            <div className="row">

              <div className="col-md-4 offset-0">
                <ul className="text-left list-unstyled">
                  {
                    featureList.map((feature, index) => (
                      <li key={index}><img src={icon} className="img-fluid" alt="" /> {feature} </li>
                    ))
                  }
                </ul>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4 offset-0">
                <ul className="text-left list-unstyled">
                  {
                    featureList2.map((feature, index) => (
                      <li key={index}><img src={icon} className="img-fluid" alt="" /> {feature} </li>
                    ))
                  }
                </ul>
              </div>

            </div>
          </div>

          {/* <!-- <div className="card-footer">
          </div> --> */}
        </div>
      </React.Fragment >
    )
  }

}
export default PricingTabItemFree