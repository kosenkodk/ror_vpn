import React from 'react'
import { I18n } from 'helpers'
import icon from 'images/icons/icon_checkbox_on'

class PricingTabItem extends React.Component {

  render() {
    const { item } = this.props;

    return (
      <React.Fragment>
        <div className="card mb-3 active">
          {/* <!-- <div className="card-header">
          </div> --> */}
          <div className="card-body d-flex flex-column">
            <div className="d-flex flex-row align-items-start justify-content-center">
              <div>
                <h2 className=" align-self-center">$</h2>
              </div>
              <div>
                <h1 className="card-title pricing-card-title">
                  {item.price}
                </h1>
              </div>
            </div>

            <h5 className="align-self-center text-sm-1">Per month</h5>

            <div className="d-flex flex-row align-items-between">
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
                <p className="pb-1 mb-1 pb-0">
                  <a className="btn btn-blue active rounded-pill text-white">{`Save $ ${item.price_duration_sale} `} </a>
                </p>
                <h5 className="card-title text-info mb-1 pb-0"><strike>$ {item.price_duration}</strike></h5>
                <h5 className="card-title mb-1 pb-0">{item.price_comment}</h5>
              </div>
            </div>

            {/* <!-- <button type="button" className="btn btn-outline-primary rounded-pill mb-n9">Best offer</button> --> */}
            <a className="align-self-center btn btn-lg btn-outline-primary">
              Start my free trial
            </a>
          </div>

          {/* <!-- <div className="card-footer">
          </div> --> */}
        </div>
      </React.Fragment>
    )
  }

}
export default PricingTabItem