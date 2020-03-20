import React from 'react'
import { InfoBlock } from '../_components/admin';
import { NavHashLink as Link } from 'react-router-hash-link';

class BankCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fullnameError: '',
      form: {
        name: {
          value: '',
          valid: true,
          rules: {
            minLength: 3
          }
        },
        card_code: {
          value: '',
          valid: true,
          rules: {
            maxLength: 3,
            isNumber: true
          }
        }
      }
    }
  }

  onChangeHandler = (key, value) => {
    this.setState(state => ({
      ...state,
      form: {
        ...state.form,
        [key]: {
          ...state.form[key],
          value,
          valid: this.validate(value, state.form[key].rules)
        }
      }
    }))
  }

  validate = (value, rules) => {
    let valid = true

    for (let key in rules) {
      switch (key) {

        case 'minLength':
          valid = valid && this.minLengthValidator(value, rules[key])
          break
        case 'maxLength':
          valid = valid && this.maxLengthValidator(value, rules[key])
          break
        case 'isNumber':
          valid = valid && this.isNumberValidator(value)
          break

        default: break
      }
    }

    return valid
  }

  minLengthValidator = (value, rule) => (value.length >= rule)
  maxLengthValidator = (value, rule) => (value.length <= rule)
  isNumberValidator = value => !isNaN(parseFloat(value)) && isFinite(value)


  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    // console.log('this.state', this.state)
    if (this.state.full_name && this.state.full_name.length > 1) {
      this.setState({ fullnameError: '' })
    } else {
      this.setState({ fullnameError: 'Name on card required' })
      return
    }
    this.props.onInputChange(e)
  }

  render() {
    const { countries, item, defaultCountryCode } = this.props
    const { form } = this.state
    return (<React.Fragment>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label" htmlFor="full_name">
          Full name
        </label>
        <div className="col-sm-6">
          <input type="text" name="full_name" aria-describedby="full_name" required={true} className="form-control" placeholder='' onChange={this.onInputChange} />
          {this.state.fullnameError && <small id="fullNameInline" className="text-muted text-red">
            {this.state.fullnameError}
          </small>
          }
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
          <input type="text" name="card_code" aria-describedby="card_details" required={true} className="form-control" placeholder='Security code'
            value={form.card_code.value} onChange={e => this.onChangeHandler('card_code', e.target.value)}
          />
          {!form.card_code.valid && <small id="cardCodeInline" className="text-muted text-red">
            Invalid Card Code
          </small>
          }
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