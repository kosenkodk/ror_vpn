import React from 'react'
import { InfoBlock } from '../_components/admin'
import { NavHashLink as Link } from 'react-router-hash-link'

class PayPal extends React.Component {
  render() {
    const { item } = this.props
    return (<div className="form-group row">
      <label className="col-sm-4 col-form-label">
        {item && item.title}
      </label>
      <div className="col-sm-6">
        <InfoBlock optionalCssClasses="my-0">
          We will rediret you to PayPal in a new browser tab to complete this transaction. If you use any pop-up blockers, please disable them to continue.
      </InfoBlock>
        <button className="btn btn-pink my-3">Check out with PayPal</button>
        <InfoBlock optionalCssClasses="my-0">
          You must have a credit card or bank account linked with your PayPal account. If your PayPal account. If your PayPal account doesn’t have that, please
        <Link to="#" className="mt-1 text-blue"> click here.</Link>
        </InfoBlock>
      </div>
      <div className="col-sm-2"></div>
    </div>
    )
  }
}
export default PayPal