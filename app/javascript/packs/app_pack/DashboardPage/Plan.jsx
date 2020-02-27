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
        className="plan col-xs-12 col-sm-6 col-md-4 col-lg-3 card-group">
        <div className={`card ${active_class} ${hover_class}`}>
          <div className="card-header">
            <div className={`plan__best-offer ${active_class} ${hover_class} d-flex flex-column justify-content-between`}>Best offer</div>
            {/* <%#= image_tag image_name, {class: 'mt-n4'} #%> */}
            <h6 className="m-0 font-weight-normal">{item.title}</h6>
          </div>
          <div className="card-body">
            {item.price > 0 ?
              <div className="d-flex flex-row align-items-start justify-content-center">
                <div className="mr-xl-1">
                  <span className="text-sm-1 font-weight-bold align-text-top">$</span>
                </div>
                <div>
                  <h1 className="card-title pricing-card-title">
                    {item.price}
                  </h1>
                </div>
                <div></div>
              </div>
              :
              <h1 className="card-title pricing-card-title">Free</h1>
            }

            <span className="text-sm-1 align-text-top">Per month</span>

            {item.price > 0 &&
              <div>
                <p className="">
                  <a className={`btn btn-pink-dark-blue ${active_class} ${hover_class} rounded-pill plan__btn-save`}>Save $ {item.price_duration_sale}</a>
                  {/* <%= link_to "Save $ #{item.try(:price_duration_sale)}", '#', {class: "btn btn-blue #{active_class} rounded-pill text-white"} %> */}
                </p>
                <h5 className="card-title text-info mb-0"><strike>$ {item.price_duration} </strike></h5>
                <h6 className="card-title">{item.price_comment}</h6>
              </div>
            }

            <ul className={`${item.price > 0 ? 'plan__features' : 'plan-free__features'} text-left list-unstyled`}>
              {item.features.split(',').map((feature, index) => (
                <li key={index}>
                  {/* <%#= image_tag 'icons/icon_checkbox_on.png', {class: 'img-fluid', alt: '' } #%> */}
                  - {feature}
                </li>
              ))}
            </ul>
          </div>

          <button type="button" className={`btn btn-outline-primary plan__btn-change align-self-center`}>
            Start today
          </button>
          {/* <div className="card-footer"></div> */}
        </div>
      </div>
    )
  }
}

export default Plan