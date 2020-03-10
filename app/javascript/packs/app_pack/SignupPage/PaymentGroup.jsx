import React from 'react'
import { I18n } from 'helpers'
import PaymentMethod from './PaymentMethod'

class PaymentGroup extends React.Component {

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
    let { item, group } = this.props
    let { active_class } = item || ''
    let { hover_class } = this.state
    return (

      <div onMouseLeave={(e) => this.handleMouseLeave(e)}
        onMouseEnter={(e) => this.handleMouseEnter(e)} onClick={(e) => this.props.handleClick(e, item.id)}
        className={`card m-0 mb-3 shadow-vega ${active_class} ${hover_class}`}>
        <div className="card-header">
          <div className={`icon-checkbox ${active_class} ${hover_class}`}></div>
          <h5 className="pt-3 mb-0 font-weight-normal">{group.title}</h5>
        </div>
        <div className="card-body pt-0">
          {group.payment_methods && group.payment_methods.map((item, index) =>
            <React.Fragment>
              <React.Fragment>
                {item.icon_urls && group.icon_urls.map((item, index) =>
                  <img key={`pm-icon-key${index}`} src={item} className="img-fluid px-1" />
                )}
              </React.Fragment>

              <React.Fragment>
                {
                  item.icon_url &&
                  <img key={`pm-icon-key${index}`} src={item} className="img-fluid px-1" />
                }
              </React.Fragment>
            </React.Fragment>
          )}
        </div>
        <div className="card-footer"></div>
      </div>


    )
  }
}

export default PaymentGroup