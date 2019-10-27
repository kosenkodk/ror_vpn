import React from 'react'
import { I18n } from 'helpers'

class PaymentMethod extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active_class: props.active_class,
    }
  }

  handleMouseEnter(e) {
    return;
    this.setState({
      hover_class: 'active',
    })
    e.preventDefault()
  }

  handleMouseLeave(e) {
    return;
    this.setState({
      hover_class: ''
    })
    e.preventDefault()
  }

  render() {
    let { item } = this.props
    let { active_class } = item
    let { hover_class } = this.state
    return (
      <div onMouseLeave={(e) => this.handleMouseLeave(e)}
        onMouseEnter={(e) => this.handleMouseEnter(e)} onClick={(e) => this.props.handleClick(e, item.id)}
        className={`card m-0 mb-3 shadow-vega ${active_class} ${hover_class}`}>
        <div className="card-header">
          <div className={`icon-checkbox ${active_class} ${hover_class}`}></div>
          <h5 className="pt-3 mb-0 font-weight-normal">{item.title}</h5>
        </div>
        <div className="card-body pt-0">
          {item.icon_urls.map((item, index) => (
            <img key={`pm-icon-key${index}`} src={item} className="img-fluid" />
          ))}
        </div>
        <div className="card-footer"></div>
      </div>
    )
  }
}

export default PaymentMethod