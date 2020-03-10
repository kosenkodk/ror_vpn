import React from 'react'
import Plan from './Plan'

class Plans extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plans: this.props.plans || [],
      preselectedIndex: 3
    }
    this.onPlanSelect = this.onPlanSelect.bind(this)
  }

  onPlanSelect(e, id, index) {
    // this.selectItemInCollectionByIndex(this.state.plans, index)
    this.props.onPlanChange(e, id)
    e.preventDefault()
  }

  selectItemInCollectionByIndex(collection, selected_index) {
    let itemList = collection.map((item, item_index) => {
      item.active_class = item_index === selected_index ? 'active' : ''
      return item
    })
    this.setState({ plans: itemList })
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({ plans: this.props.plans })
  }

  render() {
    const { plans } = this.state;
    return (
      <div id="plans" className="plans card-deck text-center align-items-center">
        {plans && plans.map((item, index) => (
          <Plan planCurrent={this.props.planCurrent} onPlanSelect={this.onPlanSelect} key={`plan-${item.id}`} index={index} item={item} />
        ))}
      </div>
    )
  }
}

export default Plans
