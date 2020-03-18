import React from 'react'
import { InfoBlock } from '../_components/admin';
import { NavHashLink as Link } from 'react-router-hash-link';

class BankCard extends React.Component {
  onInputChange = (e) => {
    this.props.onInputChange(e)
  }
  render() {
    const { countries, item, defaultCountryCode } = this.props
    return (<React.Fragment>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label" htmlFor="full_name">
          Full name
        </label>
        <div className="col-sm-6">
          <input type="text" name="full_name" aria-describedby="full_name" required={true} className="form-control" placeholder='' onChange={this.onInputChange} />
        </div>
        <div className="col-sm-2"></div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label" htmlFor="card_no">
          Card number
        </label>
        <div className="col-sm-6">
          <input type="text" name="card_no" aria-describedby="card_no" required={true} className="form-control" placeholder='' onChange={this.onInputChange} />
        </div>
        <div className="col-sm-2"></div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label" htmlFor="card_details">
          MM/YY / Security code
        </label>
        <div className="col-sm-3">
          <input type="text" name="card_date" aria-describedby="card_details" required={true} className="form-control" placeholder='MM/YY' onChange={this.onInputChange} />
        </div>
        <div className="col-sm-3">
          <input type="text" name="card_code" aria-describedby="card_details" required={true} className="form-control" placeholder='Security code' onChange={this.onInputChange} />
        </div>
        <div className="col-sm-2"></div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label" htmlFor="state_details">
          State
        </label>
        <div className="col-sm-3">
          <select className="form-control" id="countrySelectBox" onChange={this.onInputChange} name="country_code" value={defaultCountryCode || 'US'}>
            <option>Please select</option>
            {countries && countries.map((item) =>
              <option key={`${item.code}`} value={item.code}>{item.name}</option>
            )}
          </select>
        </div>
        <div className="col-sm-3">
          <input type="text" name="zip_code" aria-describedby="state_details" required={true} className="form-control" placeholder='ZIP' onChange={this.onInputChange} />
        </div>
        <div className="col-sm-2"></div>
      </div>
    </React.Fragment>
    )
  }
}
export default BankCard