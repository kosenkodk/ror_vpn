import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import Reviews from '../_sections/Reviews'
import PricingTab from './PricingTab'
import iconCheckboxOn from 'images/icons/icon_checkbox_on'

class PricingPage extends React.Component {
  render() {
    return (
      <div className="container-fluid pricing">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center">
                {I18n.t("pages.pricing.title")}
              </h1>
            </div>
            <div className="offset-2 col-8 pt-4 mb-4 border_1_pink text-center shadow-vega bg-color-black">
              <PricingTab />
            </div>

            {/* <!-- <div className="col-12 text-center">
              <p className="">Looking to add more users? Visit our <%= link_to 'Teams page.', '#', {class:'text-info'} %></p>
            </div> --> */}
          </div>

          <div className="row">
            <div className="col-sm-8">
              <h2 className="pb-4">Cheap, fast or secure. You can only choose two.</h2>
              <p className="text-opacity">You will find cheaper VPN services but you won’t find a better one. Others charge a
                little less, then make up
                the difference by overselling their servers, severely impacting your performance.
        </p>
              <p className="text-opacity">
                By charging a little more, VPN can provide you with better security, faster servers and awesome support from
                IT
                professionals. The difference is only a few dollars a month for a service that will affect your online
                experience every day.
        </p>
            </div>
            <div className="col-sm-4">
              <ul className="list-group bg-transparent text-opacity">
                <li className="list-group-item bg-transparent">
                  All plans include:</li>
                <li className="list-group-item bg-transparent">
                  <img src={iconCheckboxOn} className="img-fluid" alt="" />
                  7-day unconditional guarantee
                  </li>
                <li className="list-group-item bg-transparent">
                  <img src={iconCheckboxOn} className="img-fluid" alt="" />
                  Protection for all your
            devices</li>
                <li className="list-group-item bg-transparent">
                  <img src={iconCheckboxOn} className="img-fluid" alt="" />
                  24/7
            Support</li>
                <li className="list-group-item bg-transparent">
                  <img src={iconCheckboxOn} className="img-fluid" alt="" />
                  Audited no-logs service</li>
                <li className="list-group-item bg-transparent">
                  <img src={iconCheckboxOn} className="img-fluid" alt="" />
                  Access to all servers</li>
                <li className="list-group-item bg-transparent">
                  <img src={iconCheckboxOn} className="img-fluid" alt="" />
                  Apps
            for Windows, macOS, iOS, Android</li>
                <li className="list-group-item bg-transparent">
                  <img src={iconCheckboxOn} className="img-fluid" alt="" />
                  Unlimited bandwidth</li>
                <li className="list-group-item bg-transparent">
                  <img src={iconCheckboxOn} className="img-fluid" alt="" />
                  Instant Account Activation
          </li>
              </ul>
            </div>
            <Reviews />
            {/* <%#= render partial: 'shared/answers_and_questions' %> */}
          </div>
        </div>
      </div>
    )
  }
}

export { PricingPage }