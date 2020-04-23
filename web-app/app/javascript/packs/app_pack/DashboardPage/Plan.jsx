import React from 'react'

class Plan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      hover_class: '',
      active_class: ''
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

  isBestOffer() {
    return (this.props.index === 0) ? true : false
  }

  bestOfferClass() {
    return (this.props.index === 0) ? 'active' : ''
  }

  isPlanCurrent() {
    const isCurrent = ((this.props.planCurrent && this.props.planCurrent.id) === (this.props.item && this.props.item.id)) ? true : false
    return isCurrent
  }

  isActiveClass() {
    return this.isPlanCurrent() ? 'active' : ''
  }

  render() {
    let { item, index, currentPlan } = this.props
    let { active_class, hover_class } = this.state
    return (
      <div onMouseLeave={(e) => this.handleMouseLeave(e)}
        onMouseEnter={(e) => this.handleMouseEnter(e)}
        className={`plan col-xs-12 col-sm-6 col-lg-3 ${this.isActiveClass()}`}>
        <div className={`card ${this.isActiveClass()} ${hover_class}`}>
          <div className="card-header p-0">
            {this.isBestOffer() ?
              <div className={`plan__best-offer ${this.isActiveClass()} ${hover_class} d-flex flex-column justify-content-center`}>Best offer</div>
              :
              <div className="plan__best-offer-hidden" />
            }
            {/* <%#= image_tag image_name, {class: 'mt-n4'} #%> */}
            <h6 className="m-0">{item.title}</h6>
          </div>

          <div className={`card-body py-0 ${item.price > 0 ? '' : 'plan-free'}`}>
            {item.price > 0 ?
              <div className="d-flex flex-row align-items-start justify-content-center">
                <div className="mr-lg-3">
                  <span className="plan__price-currency align-text-top">$</span>
                </div>
                <div className="">
                  <h1 className="plan__price">
                    {item.price}
                  </h1>
                </div>
                <div className=""></div>
              </div>
              :
              <h1 className="plan__price">Free</h1>
            }

            <div className="plan__per-mo">
              <span className="align-text-top">{item.price > 0 ? 'Per month' : '$0 per month'}</span>
            </div>

            {item.price > 0 &&
              <div className="plan__discount">
                <a className={`btn ${this.isActiveClass()} ${hover_class} rounded-pill plan__btn-save ${this.bestOfferClass()}`}>Save $ {item.price_duration_sale}</a>
                <h5 className="plan__price-duration text-info"><strike>$ {item.price_duration} </strike></h5>
                <h6 className="plan__price-comment">{item.price_comment}</h6>
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

          <div className="card-footer">
            {!this.isPlanCurrent() ?
              <button type="button" className={`btn btn-outline-primary btn-block plan__btn-change align-self-center`}
                onClick={(e) => this.props.onPlanSelect(e, item.id, index)}
              >
                Start today
              </button>
              :
              <div className="plan__my-plan">
                <button type="button" className={`btn btn-outline-primary plan__btn-my-plan btn-block align-self-center`}>
                  My subscription
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Plan