import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import Logo from 'images/reviews/img_guardian.png'
import Icon from 'images/reviews/icon'

class ReviewOwner extends React.Component {
  render() {
    return (
      <div class="media">
        <img src={Icon} class="align-self-center mr-3" alt="..." />
        <div class="media-body">
          <p class="mb-0">Edward Snowden</p>
          {/* <!-- <h4 class="mt-0">Center-aligned media</h4> --> */}
          <img src={Logo} class="img-fluid" alt="..." />
          {/* <!-- <p>Cras </p> --> */}
        </div>
      </div>
    )
  }
}
export default ReviewOwner