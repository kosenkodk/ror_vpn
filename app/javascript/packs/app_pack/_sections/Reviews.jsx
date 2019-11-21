import React from 'react'
// import { I18n } from 'helpers'
import ReviewSummary from './ReviewSummary'
import ReviewOwner from './ReviewOwner'
// import imgSecuritySrc from 'images/compare/reviews'

class Reviews extends React.Component {
  render() {
    return (
      <div className="row reviews card shadow-vega">
        {/* <img src={imgSecuritySrc} className=" img-fluid" /> */}

        <div className="col-md-10 offset-md-1 text-center">
          <div className="card-header mt-4">
            Why the Media loves VPN
          </div>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-review1" role="tabpanel" aria-labelledby="pills-review1-tab">
              <ReviewSummary no='1' />
            </div>
            <div className="tab-pane fade" id="pills-review2" role="tabpanel" aria-labelledby="pills-review2-tab">
              <ReviewSummary no='2' />
            </div>
            <div className="tab-pane fade" id="pills-review3" role="tabpanel" aria-labelledby="pills-review3-tab">
              <ReviewSummary no='3' />
            </div>
          </div>
          <div className="card-footer text-left">
            <ul className="nav nav-pills mt-3 mb-2" id="pills-tab" role="tablist">
              <li className="nav-item col-sm-6 col-md-4">
                <div className="review-owner-container" id="pills-review1-tab" data-toggle="pill" href="#pills-review1" role="tab"
                  aria-controls="pills-review1" aria-selected="true">
                  <ReviewOwner />
                </div>
              </li>
              <li className="nav-item col-sm-6 col-md-4">
                <div className="active review-owner-container" id="pills-review2-tab" data-toggle="pill" href="#pills-review2"
                  role="tab" aria-controls="pills-review2" aria-selected="false">
                  <ReviewOwner />
                </div>
              </li>
              <li className="nav-item col-sm-6 col-md-4">
                <div className="review-owner-container" id="pills-review3-tab" data-toggle="pill" href="#pills-review3" role="tab"
                  aria-controls="pills-review3" aria-selected="false">
                  <ReviewOwner />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Reviews