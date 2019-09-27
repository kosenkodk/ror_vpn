import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'i18n-js/index.js.erb'
import FlashMessages from '../sections/FlashMessages'
import Plan from './Plan'

class Plans extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      active_index: 0,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  shouldComponentUpdate() {
    console.log('shouldComponentUpdate')
    return true
  }

  handleClick(e, index) {
    console.log('plan.active_index:', index)
    console.log('before set this.state.active_index:', this.state.active_index)

    this.setState({
      active_index: index,
      // items: this.state.items,
    })
    console.log('this.state.active_index:', this.state.active_index)

    this.forceUpdate()

    // this.shouldComponentUpdate(true)
    // // 1. Make a shallow copy of the items
    // let items = [...this.state.items];
    // // 2. Make a shallow copy of the item you want to mutate
    // let item = { ...items[index] };
    // // 3. Replace the property you're intested in
    // item.title = item.title + ' ';
    // // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    // items[1] = item;
    // // 5. Set the state to our new copy
    // this.setState({ items });

    // console.log(this.planRef)
    // this.planRef.current.changeActiveClass('active')
    e.preventDefault()
  }

  render() {
    return (
      <div className="plans card-deck mb-0 text-dark text-center">
        {this.state.items.map((item, index) => (
          <Plan handleClick={this.handleClick} key={`plan-${item.id}`} item={item} index={index} active_index={this.state.active_index} active_class={index == this.state.active_index ? 'active' : ''} />
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
