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
      <div id="plans" className="plans row card-deck mb-0 text-dark text-center">
        {this.state.items.map((item, index) => (
          <Plan handleClick={this.handleClick} key={`plan-${item.id}`} index={index} item={item} />
        ))}
      </div>
    )
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('tariff_plans'))
    this.setState({ items: items ? items : [] })
    if (items && items.length > this.state.preselectedIndex) {
      this.selectItemInCollectionByIndex(items, this.state.preselectedIndex)
      this.props.onPlanChange(null, items[this.state.preselectedIndex].id)
    }
    const url = "/api/v1/tariff_plans"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      }).then(items => {
        if (items && items.length > this.state.preselectedIndex) {
          localStorage.setItem('tariff_plans', JSON.stringify(items))
          this.selectItemInCollectionByIndex(items, this.state.preselectedIndex)
          this.props.onPlanChange(null, items[this.state.preselectedIndex].id)
        }
      }).catch((err) => {
        console.log(err)
      });
  }
}

export default Plans
