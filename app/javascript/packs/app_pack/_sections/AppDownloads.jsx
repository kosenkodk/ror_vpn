import React from 'react'
import { I18n } from 'helpers'
import Vega from 'images/vega_vertical.png'
import VegaForExtraSmallScreens from 'images/vega_horizontal.png'

import Apple from 'images/downloads/svg/Apple'
import Android from 'images/downloads/svg/Android'
import WP from 'images/downloads/svg/WP'
import Linux from 'images/downloads/svg/Linux'

class AppDownloads extends React.Component {
  render() {
    return (
      <div id="downloads" className="card">
        <div id="downloads_section" className="row no-gutters">
          <div className="col-md-6 d-flex align-content-center flex-wrap">
            <img src={VegaForExtraSmallScreens} className="ml-auto img-fluid d-block d-md-none" alt="" />
            <img src={Vega} className="ml-auto img-fluid d-none d-md-block" alt="" />
            {/* <%#=image_tag 'downloads', { class:'card-img', alt:''} #%> */}
          </div>
          <div className="col-md-6 d-flex align-content-center flex-wrap">
            <div className="card-body">
              <p className="card-text pb-0 mb-0">
                <img src={Apple} className="mr-3 img-fluid" alt="" />
                <img src={Android} className="mr-3 img-fluid" alt="" />
                <img src={WP} className="mr-3 img-fluid" alt="" />
                <img src={Linux} className="mr-3 img-fluid" alt="" />
              </p>
              <h1 className="card-title">One account for all your devices</h1>
              <p className="card-text">With your {I18n.t('vegaVPN')} VPN account you will gain unlimited access on all of our
                supported
                platforms,
                allowing you to protect all
                of your personal devices at the same time – without any bandwidth or data caps. Find out more in our Apps
            section.</p>
              {/* <!-- <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> --> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppDownloads