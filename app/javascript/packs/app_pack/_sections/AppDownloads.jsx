import React from 'react'
import { connect } from 'react-redux'
import { I18n } from 'helpers'
// import Vega from 'images/vega_vertical2x.png'
import Vega from 'images/vega_vertical_drop_shadow_2x.png'
import VegaForExtraSmallScreens from 'images/vega_horizontal.png'
import { globalActions } from '../_actions'

import Apple from 'images/icons/app_clients/light2/svg/ios'
import Android from 'images/icons/app_clients/light2/svg/android'
import WP from 'images/icons/app_clients/light2/svg/windows'
import Linux from 'images/icons/app_clients/light2/svg/linux'

class AppDownloads extends React.Component {

  componentDidMount() {
    this.props.dispatch(globalActions.getAppClients())
  }

  render() {
    const { app_clients } = this.props
    return (
      <div id="downloads" className="card">
        <div id="downloads_section" className="row no-gutters">
          <div className="col-md-6 d-flex align-content-center flex-wrap">
            <img src={VegaForExtraSmallScreens} className="ml-auto img-fluid d-block d-md-none" alt="" />
            <img src={Vega} className="ml-auto img-fluid d-none d-md-block" alt="" style={{ maxHeight: '454px' }} />
            {/* <%#=image_tag 'downloads', { class:'card-img', alt:''} #%> */}
          </div>
          <div className="col-md-6 col-xl-5 d-flex align-content-center flex-wrap">
            <div className="card-body">
              <p className="card-text pb-0 mb-0 mb-xl-3">
                {(app_clients && app_clients.length > 0) ?
                  <p className="card-text pb-0 mb-0 mb-xl-3">
                    {app_clients.map(item =>
                      <a key={`app_client${item && item.id}`} href={item.url} className="" target="_blank">
                        <img src={item && item.icon_light_url} className="mr-4 img-fluid" alt="" />
                      </a>
                    )}
                  </p>
                  :
                  <p className="card-text pb-0 mb-0 mb-xl-3">
                    <a href="http://example.com" className="" target="_blank">
                      <img src={Apple} className="mr-4 img-fluid" alt="" />
                    </a>
                    <img src={Android} className="mr-4 img-fluid" alt="" />
                    <img src={WP} className="mr-4 img-fluid" alt="" />
                    <img src={Linux} className="img-fluid" alt="" />
                  </p>
                }
              </p>

              <h1 className="card-title">One account for all your devices</h1>
              <p className="card-text col-xl-10 p-0 mt-xl-4">With your {I18n.t('vegaVPN')} VPN account you will gain unlimited access on all of our
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

function mapStateToProps(state) {
  const { app_clients } = state.global
  return {
    app_clients,
  }
}

const connectedPage = connect(mapStateToProps)(AppDownloads)
export { connectedPage as AppDownloads }
