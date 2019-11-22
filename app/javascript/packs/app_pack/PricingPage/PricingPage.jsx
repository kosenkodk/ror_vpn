import React from 'react'
import { I18n } from 'helpers'
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

            <div className="offset-md-2 col-md-8 pt-4 mb-4 text-center shadow-vega border-rounded bg-color-black">
              <PricingTab />
            </div>

            {/* <!-- <div className="col-12 text-center">
              <p className="">Looking to add more users? Visit our <%= link_to 'Teams page.', '#', {class:'text-info'} %></p>
            </div> --> */}
          </div>

          <div className="row">
            <div className="col-sm-8">
              <h2 className="pb-4">Cheap, fast or secure. <br />You can only choose two.</h2>
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
                  All plans include:
                </li>
                {['7-day unconditional guarantee', 'Protection for all your', '24/7 Support', 'Audited no-logs service',
                  'Access to all servers', 'Apps for Windows, macOS, iOS, Android', 'Unlimited bandwidth', 'Instant Account Activation'
                ].map((item, index) =>
                  <li key={`pricingPlanFeature${index}`} className="list-group-item bg-transparent">
                    <img src={iconCheckboxOn} className="mr-xl-2 img-fluid" alt="" />
                    {item}
                  </li>
                )}
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