import React from 'react'
import Plan from './Plan'

class Plans extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      preselectedIndex: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, id, index) {
    this.selectItemInCollectionByIndex(this.state.items, index)
    this.props.onPlanChange(e, id)
    e.preventDefault()
  }

  selectItemInCollectionByIndex(collection, selected_index) {
    let itemList = collection.map((item, item_index) => {
      item.active_class = item_index === selected_index ? 'active' : ''
      return item
    })
    this.setState({ items: itemList })
  }

  render() {
    return (
      <div id="plans" className="plans card-deck mb-0 text-dark text-center">
        {this.state.items.map((item, index) => (
          <Plan handleClick={this.handleClick} key={`plan-${item.id}`} index={index} item={item} />
        ))}
      </div>
    )
  }

  componentDidMount() {
    const url = "/api/v1/tariff_plans";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      }).then(response => {
        this.selectItemInCollectionByIndex(response, this.state.preselectedIndex)
        this.props.onPlanChange(null, this.state.items[this.state.preselectedIndex])
      }).catch((err) => {
        console.log(err)
      });
  }
}

export default Plans
