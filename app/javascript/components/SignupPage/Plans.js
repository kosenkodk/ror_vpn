import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'i18n-js/index.js.erb'
import FlashMessages from '../sections/FlashMessages'
import Plan from './Plan'

class Plans extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.planRef = React.createRef()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, index) {
    console.log('click', index)
    // console.log(this.planRef)
    this.planRef.current.changeActiveClass('active')
    e.preventDefault()
  }

  render() {
    return (
      <div className="plans card-deck mb-0 text-dark text-center">
        {this.state.items.map((item, index) => (
          <Plan handleClick={this.handleClick} ref={this.planRef} key={item.id} item={item} active_class={index == 0 ? 'active' : ''} />
        ))}
      </div>
    )
  }

  componentDidMount() {
    const url = "api/v1/tariff_plans";
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

export default Plans
