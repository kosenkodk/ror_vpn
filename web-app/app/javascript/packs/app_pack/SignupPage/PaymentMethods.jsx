import React from 'react'
import PaymentMethod from './PaymentMethod'
import PaymentMethodDetails from './PaymentMethodDetails'
import PaymentMethodCreditCardForm from './PaymentMethodCreditCardForm'
import { I18n } from 'helpers'

class PaymentMethods extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      preselectedIndex: 2
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, selected_item_id) {
    this.selectItemInCollectionByItemId(this.state.items, selected_item_id)
    e.preventDefault()
  }

  selectItemInCollectionByIndex(collection, selected_item_id) {
    let itemList = collection.map((item, index) => {
      item.active_class = index === selected_item_id ? 'active' : ''
      return item
    })
    this.setState({ items: itemList })
  }

  selectItemInCollectionByItemId(collection, selected_item_id) {
    let itemList = collection.map((item) => {
      item.active_class = item.id === selected_item_id ? 'active' : ''
      return item
    })
    this.setState({ items: itemList })
  }

  render() {
    return (
      <React.Fragment>
        <ul className="payment_methods row card-deck mb-3 text-dark text-center nav nav-tabs" id="pmTab" role="tablist">
          {this.state.items && this.state.items.length > 0 && this.state.items.map((item, index) => (
            <li key={`pm-key${index}`} className="nav-item col-sm-6 col-md-4">
              <a className="nav-link bg-transparent p-0" id={`pm${index}-tab`} data-toggle="tab" href={`#pm${index}`}
                role="tab" aria-controls={`pm1${index}`} aria-selected={index == this.state.preselectedIndex ? true : false}>
                <PaymentMethod item={item} handleClick={this.handleClick} />
              </a>
            </li>
          ))}
        </ul>

        <div className="container payment_methods border_1_pink">
          <div className="row shadow-vega pb-5 bg-vega">
            <div className="col-lg-8 offset-lg-2 text-left">
              <div className="tab-content">
                {this.state.items && this.state.items.length > 0 && this.state.items.map((item, index) => (
                  <div key={`pm-key${index}`} className={`tab-pane ${index == this.state.preselectedIndex ? 'active' : ''}`} id={`pm${index}`} role="tabpanel" aria-labelledby={`pm1${index}-tab`}>
                    {
                      (item.title === I18n.t('payment_method.credit_card')) &&
                      <PaymentMethodCreditCardForm
                        onPaymentMethodChange={this.props.onPaymentMethodChange} paymentMethodId={item.id}
                      />
                    }
                    <PaymentMethodDetails onFormSubmit={this.props.onFormSubmit} item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  componentDidMount() {
    const payment_methods = 'payment_methods_for_signup';
    // const payment_methods = 'payment_methods';
    const items = JSON.parse(localStorage.getItem(payment_methods))
    if (items && items.length > this.state.preselectedIndex) {
      this.setState({ items: items ? items : [] })
      this.selectItemInCollectionByIndex(items, this.state.preselectedIndex)
    }

    const url = `/api/v1/${payment_methods}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(items => {
        if (items && items.length > this.state.preselectedIndex) {
          localStorage.setItem(payment_methods, JSON.stringify(items))
          this.selectItemInCollectionByIndex(items, this.state.preselectedIndex)
          this.props.onPaymentMethodChange(items[this.state.preselectedIndex].id)
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

export default PaymentMethods
