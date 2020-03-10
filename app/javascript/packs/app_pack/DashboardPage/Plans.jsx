import React from 'react'
import Plan from './Plan'

class Plans extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.plans || [],
      preselectedIndex: 3
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, id, index) {
    // this.selectItemInCollectionByIndex(this.state.items, index)
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
    const { plans } = this.props;
    return (
      <div id="plans" className="plans card-deck text-center align-items-center">
        {plans && plans.map((item, index) => (
          <Plan handleClick={this.handleClick} key={`plan-${item.id}`} index={index} item={item} />
        ))}
      </div>
    )
  }

  componentDidMount() {
    // this.setState({ items: this.props.plans })
  }
}

export default Plans
