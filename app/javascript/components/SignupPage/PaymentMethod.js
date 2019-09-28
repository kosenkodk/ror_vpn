import React from 'react'

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


      <h1>{item.title}</h1>
    )
  }
}

export default PaymentMethod