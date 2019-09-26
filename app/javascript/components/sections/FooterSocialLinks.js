import React from 'react'

import ic_facebook from 'images/icons/ic_facebook.png'
import ic_twitter from 'images/icons/ic_twitter.png'
import ic_instagram from 'images/icons/ic_instagram.png'
import ic_pinterest from 'images/icons/ic_pinterest.png'
import ic_telegram from 'images/icons/ic_telegram.png'

class FooterSocialLinks extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 text-center">
          <a href="#"><img src={ic_facebook} className="mb-2" alt="Icon Facebook" /></a>
          <a href="#"><img src={ic_twitter} className="mb-2" alt="Icon Twitter" /></a>
          <a href="#"><img src={ic_instagram} className="mb-2" alt="Icon Instagram" /></a>
          <a href="#"><img src={ic_pinterest} className="mb-2" alt="Icon Pinterest" /></a>
          <a href="#"><img src={ic_telegram} className="mb-2" alt="Icon Telegram" /></a>
          {/* <%= link_to image_tag('icons/ic_facebook.png', {class:'mb-2', alt:'Icon Facebook'}), '#' %>
<%= link_to image_tag('icons/ic_twitter.png', {class:'mb-2', alt:'Icon '}), '#' %>
<%= link_to image_tag('icons/.png', {class:'mb-2', alt:'Icon '}), '#' %>
<%= link_to image_tag('icons/.png', {class:'mb-2', alt:'Icon '}), '#' %>
<%= link_to image_tag('icons/.png', {class:'mb-2', alt:'Icon '}), '#' %> */}
        </div>
      </div >
    )
  }
}
export default FooterSocialLinks