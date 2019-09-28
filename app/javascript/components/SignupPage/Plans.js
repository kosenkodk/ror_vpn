import React from 'react'
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
    console.log('plans.render()', this.state.active_index)
    return (
      <div className="plans card-deck mb-0 text-dark text-center">
        {this.state.items.map((item, index) => (
          <Plan handleClick={this.handleClick} key={`plan-${item.id}`} item={item} index={index} active_index={this.state.active_index} active_class={item.active_class} active_class2={index == this.state.active_index ? 'active' : ''} />
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
