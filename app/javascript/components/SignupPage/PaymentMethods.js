import React from 'react'
import PaymentMethod from './PaymentMethod'

class PaymentMethods extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      active_index: 0,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, index) {

    this.setState({
      active_index: index,
    })

    let itemList = this.state.items.map((item, item_index) => {
      item.active_class = item_index === index ? 'active' : ''
      return item
    })

    this.setState({ items: itemList })

    e.preventDefault()
  }

  render() {
    return (
      <React.Fragment>
        <ul className="payment_methods card-deck mb-3 text-dark text-center nav nav-tabs" id="pmTab" role="tablist">
          {this.state.items.map((item, index) => (
            <li key={`pm-key${index}`} className="nav-item col-sm-6 col-md-4">
              <a className="nav-link bg-transparent p-0" id={`pm${index}-tab`} data-toggle="tab" href={`#pm${index}`}
                role="tab" aria-controls={`pm1${index}`} aria-selected={index == 0 ? true : false}>
                <PaymentMethod item={item} />
                {/* <PaymentMethod handleClick={this.handleClick} key={`plan-${item.id}`} item={item} index={index} active_index={this.state.active_index} active_className={item.active_class} active_class2={index == this.state.active_index ? 'active' : ''} /> */}
                {/* <%= render partial: 'auth/payment_method_item', locals: {image_name: get_active_checkbox_icon, active_class: '' } %> */}
              </a>
            </li>
          ))}
        </ul>

        {/* <div className="container payment_methods border_1_pink">
          <div className="row shadow-vega pb-5">
            <div className="col-md-8 offset-md-2 text-left">
              <div className="tab-content">
                <div className="tab-pane" id="pm1" role="tabpanel" aria-labelledby="pm1-tab">
                  <%= render partial: 'payment_methods_item1_details', locals: {f: f, active_class: ''} %>
        </div>
                <div className="tab-pane" id="pm2" role="tabpanel" aria-labelledby="pm2-tab">
                  <%= render partial: 'payment_methods_item2_details', locals: {f: f, active_class: ''} %>
        </div>
                <div className="tab-pane active" id="pm3" role="tabpanel" aria-labelledby="pm3-tab">
                  <%= render partial: 'payment_methods_item3_details', locals: {f: f, active_class: ''} %>
        </div>
              </div>
            </div>
          </div> */}

      </React.Fragment>
    )
  }

  componentDidMount() {
    const url = "api/v1/payment_methods";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ items: response }))
      .catch((err) => {
        console.log(err)
      });
  }
}

export default PaymentMethods
