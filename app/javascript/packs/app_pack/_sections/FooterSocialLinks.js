import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

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