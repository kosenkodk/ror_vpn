import React from 'react'
import { I18n } from 'helpers'

class BankCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: {
        full_name: {
          value: '',
          valid: true,
          rules: {
            minLength: 1
          }
        },
        card_no: {
          value: '',
          valid: true,
          rules: {
            minLength: 16,
            maxLength: 16,
            isNumber: true
          }
        },
        card_date: {
          value: '',
          valid: true,
          rules: {
            minLength: 5,
            maxLength: 5,
            isDateExpired: false
          }
        },
        card_code: {
          value: '',
          valid: true,
          rules: {
            minLength: 3,
            maxLength: 3,
            isNumber: true
          }
        },
        zip_code: {
          value: '',
          valid: true,
          rules: {
            minLength: 4,
            isNumber: true
          }
        }
      }
    }
  }

  onChangeHandler = (key, value) => {
    if (key === 'card_date') {
      const prevItem = this.state.form.card_date
      if (value.length >= prevItem.rules.maxLength) {
        value = value.substring(0, prevItem.rules.maxLength)
      }
      else if (value.length === 2)
        if (prevItem.value.includes('/'))
          value = value[0]
        else
          value += '/'
    }
    this.setState(prevState => {
      const state = {
        ...prevState,
        form: {
          ...prevState.form,
          [key]: {
            ...prevState.form[key],
            value,
            valid: this.validate(value, prevState.form[key].rules),
          }
        }
      }
      this.props.onChangeHandler(null, this.isValidForm(state))
      return state;
    })
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
        case 'isDateExpired':
          valid = valid && this.isDateExpired(value)
          break
        default: break
      }
    }

    return valid
  }

  minLengthValidator = (value, rule) => (value.length >= rule)
  maxLengthValidator = (value, rule) => (value.length <= rule)
  isNumberValidator = value => !isNaN(parseFloat(value)) && isFinite(value)
  isDateExpired = value => {
    let isValid = true
    const [mm, yy] = value.split('/')
    const date = new Date()
    const yy_now = date.getFullYear().toString().substr(2)
    const mm_now = date.getMonth() + 1 //((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1)

    const month = parseInt(mm)
    const year = parseInt(yy)
    const year_now = parseInt(yy_now)
    const month_now = parseInt(mm_now)

    if (year >= year_now + 20)
      isValid = false

    if (year < year_now)
      isValid = false

    if (month > 12)
      isValid = false

    if ((year == year_now) && (month < month_now))
      isValid = false

    return isValid
  }

  isValidForm(state) {
    const isValid = Object.values(state.form).filter(item => !item.valid).length > 0 ? false : true
    return isValid
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
          <input type="text" name="full_name" aria-describedby="full_name" required={true} className="form-control" placeholder=''
            value={form.full_name.value} onChange={e => this.onChangeHandler('full_name', e.target.value)}
          />
          {!form.full_name.valid && <small className="text-muted text-red">
            {I18n.t('bank_card.errors.invalid_fullname')}
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
          <input type="number" name="card_no" aria-describedby="card_no" required={true} className="form-control" placeholder=''
            value={form.card_no.value} onChange={e => this.onChangeHandler('card_no', e.target.value)}
          />
          {!form.card_no.valid && <small className="text-muted text-red">
            {I18n.t('bank_card.errors.invalid_card_no')}
          </small>
          }
        </div>
        <div className="col-sm-2"></div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label" htmlFor="card_details">
          MM/YY / Security code
        </label>
        <div className="col-sm-3">
          <input type="text" name="card_date" aria-describedby="card_details" required={true} className="form-control" placeholder='MM/YY'
            value={form.card_date.value} onChange={e => this.onChangeHandler('card_date', e.target.value)}
          />
          {!form.card_date.valid && <small className="text-muted text-red">
            {I18n.t('bank_card.errors.invalid_date')}
          </small>
          }
        </div>
        <div className="col-sm-3">
          <input type="number" name="card_code" aria-describedby="card_details" required={true} className="form-control" placeholder='Security code'
            value={form.card_code.value} onChange={e => this.onChangeHandler('card_code', e.target.value)}
          />
          {!form.card_code.valid && <small className="text-muted text-red">
            {I18n.t('bank_card.errors.invalid_cvc')}
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
          <input type="number" name="zip_code" aria-describedby="state_details" required={true} className="form-control" placeholder='ZIP'
            value={form.zip_code.value} onChange={e => this.onChangeHandler('zip_code', e.target.value)}
          />
          {!form.zip_code.valid && <small className="text-muted text-red">
            {I18n.t('bank_card.errors.invalid_zip')}
          </small>
          }
        </div>
        <div className="col-sm-2"></div>
      </div>
    </React.Fragment>
    )
  }
}
export default BankCard