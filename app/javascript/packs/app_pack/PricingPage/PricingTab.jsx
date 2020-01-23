import React from 'react'
// import { I18n } from 'helpers'
import PricingTabItem from './PricingTabItem'
import PricingTabItemFree from './PricingTabItemFree'

class PricingTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  render() {
    const { items } = this.state

    return (
      <React.Fragment>
        {/* {items && items.length > 0 &&
          <React.Fragment> */}
        <ul className="nav nav-pills mb-3" id="pills-tabPlan" role="tablist">
          {items && items.map((item, index) => (
            <li key={item.id} className="nav-item col-sm-6 col-md-3">
              <button className={`btn btn-pink-dark btn-block rounded-pill ${index == 0 ? 'active' : ''}`}
                id={`pills-plan${index}-tab`} data-toggle="pill" href={`#pills-plan${index}`} role="tab"
                aria-controls={`pills-plan${index}`} aria-selected="true">{item.title}</button>
            </li>
          ))
          }
        </ul>

        <div className="tab-content" id="pills-tabPlanContent">
          {
            items && items.map((item, index) => (
              <div key={item.id} className={`tab-pane fade show ${index == 0 ? 'active' : ''}`}
                id={`pills-plan${index}`} role="tabpanel" aria-labelledby={`pills-plan${index}-tab`}>
                {/* <PricingTabItem {...item} /> */}
                {item.price > 0 ? <PricingTabItem item={item} /> : <PricingTabItemFree item={item} />}
              </div>
            ))
          }
        </div>
        {/* </React.Fragment>
        } */}
      </React.Fragment>
    )
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('tariff_plans'))
    // console.log('tariff_plans', items)
    this.setState({ items: items ? items : [] })
    const url = 'api/v1/tariff_plans'
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => {
        localStorage.setItem('tariff_plans', JSON.stringify(response))
        this.setState({ items: response })
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

export default PricingTab