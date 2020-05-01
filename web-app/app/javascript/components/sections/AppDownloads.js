import React from 'react'
import { I18n } from 'helpers'

import Apple from 'images/downloads/Apple.svg'
import Android from 'images/downloads/Android.svg'
import WP from 'images/downloads/WP.svg'
import Linux from 'images/downloads/Linux.svg'

class AppDownloads extends React.Component {
  render() {
    return (
      <div id="downloads" className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-6">
            {/* <%#=image_tag 'downloads', { class:'card-img', alt:''} #%> */}
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <p className="card-text">
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