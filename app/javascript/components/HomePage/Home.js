import React from 'react'
import Features from '../Features'

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <Features />
          {/* // <%= render partial: 'shared/product_with_btn_pricing' %> */}
          {/* // <%= render partial: 'shared/reviews_section_tab' %> */}
          {/* // <%= render partial: 'shared/security_and_trust' %> */}
          {/* // <%#= render partial: 'shared/features', locals: {items: @features} #%> */}
        </div>
        <div className="container-fluid bg2">
          <div className="container">
            {/* // <%= render partial: 'shared/app_downloads' %> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Home