import React from 'react'
import Plan from './Plan'

class Plans extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      preselectedIndex: 3
    }
    this.onPlanSelect = this.onPlanSelect.bind(this)
  }

  onPlanSelect(e, id, index) {
    this.props.onPlanChange(e, id, index)
    e.preventDefault()
  }

  render() {
    const { plans } = this.props;
    return (
      <div id="plans" className="plans card-deck text-center">
        {plans && plans.map((item, index) => (
          <Plan planCurrent={this.props.planCurrent} onPlanSelect={this.onPlanSelect} key={`plan-${item.id}`} index={index} item={item} />
        ))}
      </div>
    )
  }
}

export default Plans
