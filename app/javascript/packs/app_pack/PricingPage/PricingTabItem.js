import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import icon from 'images/icons/icon_checkbox_on'

class PricingTabItem extends React.Component {

  render() {
    const { item } = this.props;

    return (
      <React.Fragment>
        <div className="card mb-3 active">
          {/* <!-- <div className="card-header">
          </div> --> */}
          <div className="card-body">
            <h1 className="card-title pricing-card-title pt-0 mt-0 mb-0">
              <span className="text-sm-1 align-text-top">$</span> {item.price}
            </h1>

            <span className="text-sm-1 align-text-top pt-n5">Per month</span>
            <h5 className="card-title"></h5>
            <div className="row">
              <div className="col-md-6 offset-0">
                <ul className="text-left list-unstyled">
                  {
                    item.features.split(',').map((feature, index) => (
                      <li key={index}><img src={icon} className="img-fluid" alt="" /> {feature} </li>
                    ))
                  }
                </ul>
              </div>
              <div className="col-md-6 offset-0 text-right">
                <p className="pb-0">
                  <a className="btn btn-blue active rounded-pill text-white">{`Save $ ${item.price_duration_sale} `} </a>
                </p>
                <h5 className="card-title text-info"><strike>$ {item.price_duration}</strike></h5>
                <h5 className="card-title">{item.price_comment}</h5>
              </div>
              <div className="col-md-12 pt-2">
                {/* <!-- <button type="button" className="btn btn-outline-primary rounded-pill mb-n9">Best offer</button> --> */}
                <a className="btn btn-outline-primary">
                  Start my free trial
                </a>
              </div>

            </div>
          </div>

          {/* <!-- <div className="card-footer">
          </div> --> */}
        </div>
      </React.Fragment>
    )
  }

}
export default PricingTabItem