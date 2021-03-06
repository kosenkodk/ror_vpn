import React from 'react';
import { I18n } from 'helpers';
import BankCard from './BankCard';

class BankCardForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  onBankCardInputChange = (e, isValidForm) => {
    this.setState({ isValidForm: isValidForm })
  }

  onSaveBankCard = (e) => {
    e.preventDefault()
    // if (this.state.isValidForm)
    this.props.onSaveBankCard(e, this.state.isValidForm)
  }

  render() {
    const { countries } = this.props
    return (<form onSubmit={this.onSaveBankCard}>
      <BankCard onBankCardInputChange={this.onBankCardInputChange} countries={countries} />
      <div className="form-group row">
        <div className="col-sm-4">
        </div>
        <div className="col-sm-6">
          <button type="submit" className="btn btn-outline-primary btn-block">{I18n.t('buttons.save')}</button>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </form>
    )
  }
}
export default BankCardForm