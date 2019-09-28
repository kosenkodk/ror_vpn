import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class PaymentMethod extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active_class: props.active_class,
      active_index: props.active_index
    }
  }

  handleMouseEnter(e, index) {
    this.setState({
      hover_class: 'active',
    })
    e.preventDefault()
  }

  handleMouseLeave(e, index) {
    this.setState({
      hover_class: ''
    })
    e.preventDefault()
  }

  render() {
    let { item } = this.props
    let { hover_class } = this.state
    let { active_class } = item
    return (
      <div className="card m-0 mb-3 shadow-vega <%= active_class %>">
        <div className="card-header">
          <div className="icon-checkbox <%= active_class %>"></div>
          <h5 className="pt-3 mb-0 font-weight-normal">{item.title}</h5>
        </div>
        <div className="card-body pt-0">
          {item.icon_urls.map((item, index) => (
            <img key={`pm-icon-{index}`} src={item} className="img-fluid" />
          ))}
        </div>
        <div className="card-footer"></div>
      </div>
    )
  }
}

export default PaymentMethod