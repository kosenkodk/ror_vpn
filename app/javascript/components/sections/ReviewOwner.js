import React from 'react'
import { I18n } from 'helpers'
import Logo from 'images/reviews/img_guardian.png'
import Icon from 'images/reviews/icon'

class ReviewOwner extends React.Component {
  render() {
    return (
      <div className="media">
        <img src={Icon} className="align-self-center mr-3" alt="..." />
        <div className="media-body">
          <p className="mb-0">Edward Snowden</p>
          {/* <!-- <h4 className="mt-0">Center-aligned media</h4> --> */}
          <img src={Logo} className="img-fluid" alt="..." />
          {/* <!-- <p>Cras </p> --> */}
        </div>
      </div>
    )
  }
}
export default ReviewOwner