import React from 'react'
import { connect } from 'react-redux'
import { NavHashLink as Link } from 'react-router-hash-link'

import { I18n } from 'helpers'
import { globalActions, alertActions } from '../_actions'
import icDownloadSrc from 'images/icons/ic_download.svg'
import icDownload2Src from 'images/icons/ic_download2.svg'
import { userService } from '../_services'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

class DownloadsPage extends React.Component {

  onDownload = (e, item) => {
    e.preventDefault()
    userService.getConfig(item.id)
      .then(response => {
        let data = {}
        try {
          data = JSON.parse(response)
        } catch (e) { }

        // network error
        if (!response.ok) {
          const error = (data && data.error) || (data && data.message) || response.statusText
          return Promise.reject(error)
        }
        this.props.dispatch(alertActions.success('success'))
        return response.blob()
      })
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${item.vpn_host || 'client'}.ovpn`
        const clickHandler = () => {
          setTimeout(() => {
            URL.revokeObjectURL(url)
            a.removeEventListener('click', clickHandler)
          }, 150);
        };
        a.addEventListener('click', clickHandler, false)
        a.click()
        return a
      },
        error => {
          this.props.dispatch(alertActions.error(error))
        }
      );
  }

  is_available(item) {
    const user = this.props.user
    let is_available = false
    if (item.tariff_plan)
      is_available = user.tariff_plan.id === item.tariff_plan.id
    if (user.tariff_plan && !user.tariff_plan.is_free)
      is_available = true
    return is_available
  }

  componentDidMount() {
    this.props.dispatch(globalActions.getConfigs())
    this.props.dispatch(globalActions.getAppClients())
  }

  render() {
    const { configs, app_clients } = this.props
    return (
      <div className="container-fluid downloads">
        <div className="row">
          <div className="col">
            <h1 className="">{I18n.t('pages.downloads.clients.title')}</h1>
            <div className="row text-center">
              {app_clients && app_clients.map(item =>
                <div className="col">
                  <div className="card" key={`app${item.id}}`}>
                    <div className="card-header">
                      <img src={item.icon_url} />
                    </div>
                    <div className="card-body">
                      {item.title}
                    </div>
                    <div className="card-footer">
                      <a href={item.url} className="btn btn-pink" target="_blank">
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <h1 className="">{I18n.t('pages.downloads.configs.title')}</h1>
            <div className="table-responsive">
              <table className="table mt-30">
                <thead>
                  <tr>
                    <th className="font-weight-bold"></th>
                    <th className="font-weight-bold">Country</th>
                    {/* <th className="font-weight-bold">Status</th> */}
                    <th className="font-weight-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(configs && configs.length > 0) ?
                    configs.map(item =>
                      <tr key={`invoice${item.id}`}>
                        <td>
                          <img src={item.country && item.country.icon_url} className="" alt="" />
                        </td>
                        <td>{item.title}</td>
                        {/* <td>{item.status}</td> */}
                        <td className="text-right table-actions">
                          {this.is_available(item) ?
                            <a href="#" onClick={(e) => this.onDownload(e, item)}>
                              <img src={icDownloadSrc} className="img-fluid" />
                            </a>
                            :
                            <OverlayTrigger
                              key={'top'}
                              placement={'top'}
                              overlay={
                                <Tooltip id={`tooltip-${item.id}`}>
                                  Plan upgrade required
                                </Tooltip>
                              }
                            >
                              <Link to="#">
                                <img src={icDownload2Src} className="img-fluid" />
                              </Link>
                            </OverlayTrigger>
                          }
                        </td>
                      </tr>
                    ) :
                    <tr>
                      <td rowSpan="6">Configs are not found</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { configs, app_clients } = state.global
  const { user } = state.authentication
  return {
    user,
    configs,
    app_clients,
  }
}

const connectedPage = connect(mapStateToProps)(DownloadsPage)
export { connectedPage as DownloadsPage }