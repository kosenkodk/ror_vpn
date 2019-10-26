import React from 'react'

class Plan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hover_class: ''
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
        onMouseEnter={(e) => this.handleMouseEnter(e)}
        onClick={(e) => this.props.handleClick(e, item.id, this.props.index)}
        className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-3 p-0 card-group">
        <div className={`card mb-3 m-1 shadow-vega ${active_class} ${hover_class}`}>
          <div className="card-header pt-2 pb-0">
            <div className={`icon-checkbox ${active_class} ${hover_class} pb-5`}></div>
            {/* <%#= image_tag image_name, {class: 'mt-n4'} #%> */}
            <h6 className="m-0 font-weight-normal">{item.title}</h6>
          </div>
          <div className="card-body pt-0 pb-0">

            {item.price > 0 ?
              <h1 className="card-title pricing-card-title mt-0 mb-0">
                <span className="text-sm-1 align-text-top">$</span> {item.price}
              </h1>
              :
              <h1 className="card-title pricing-card-title mt-0 mb-0">Free</h1>
            }

            <span className="text-sm-1 align-text-top">Per month</span>

            {item.price > 0 &&
              <div>
                <p className="p-0 mb-0 mt-2">
                  <a className={`btn btn-pink-dark-blue ${active_class} ${hover_class} rounded-pill text-white`}>Save $ {item.price_duration_sale}</a>
                  {/* <%= link_to "Save $ #{item.try(:price_duration_sale)}", '#', {class: "btn btn-blue #{active_class} rounded-pill text-white"} %> */}
                </p>
                <h5 className="card-title text-info"><strike>$ {item.price_duration} </strike></h5>
                <h6 className="card-title">{item.price_comment}</h6>
              </div>
            }

            <ul className="text-left pt-0 text-opacity">
              {item.features.split(',').map((feature, index) => (
                <li key={index}>
                  {/* <%#= image_tag 'icons/icon_checkbox_on.png', {class: 'img-fluid', alt: '' } #%> */}
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer p-0 m-0 mt-n2">
            <button type="button" className={`btn btn-outline-primary rounded-pill mb-n4 ${active_class || hover_class ? '' : 'd-none'}`}>Best
        offer</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Plan