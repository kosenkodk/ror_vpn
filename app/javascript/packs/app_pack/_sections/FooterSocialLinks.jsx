import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

import ic_facebook from 'images/icons/ic_facebook.svg'
import ic_twitter from 'images/icons/ic_twitter.svg'
import ic_instagram from 'images/icons/ic_instagram.svg'
import ic_pinterest from 'images/icons/ic_pinterest.svg'
import ic_telegram from 'images/icons/ic_telegram.svg'

class FooterSocialLinks extends React.Component {
  render() {
    return (
      <div id="social_links" className="social_links row">
        <div className="col-12 text-center">
          <HashLink to="#"><img src={ic_facebook} className="mb-2" alt="Icon Facebook" /></HashLink>
          <HashLink to="#"><img src={ic_twitter} className="mb-2" alt="Icon Twitter" /></HashLink>
          <HashLink to="#"><img src={ic_instagram} className="mb-2" alt="Icon Instagram" /></HashLink>
          <HashLink to="#"><img src={ic_pinterest} className="mb-2" alt="Icon Pinterest" /></HashLink>
          <HashLink to="#"><img src={ic_telegram} className="mb-2" alt="Icon Telegram" /></HashLink>
        </div>
      </div>
    )
  }
}
export default FooterSocialLinks