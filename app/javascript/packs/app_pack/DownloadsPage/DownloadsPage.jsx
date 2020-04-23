import React from 'react'
import { connect } from 'react-redux'
import { NavHashLink as Link } from 'react-router-hash-link'

import { I18n } from 'helpers'
import { globalActions } from '../_actions'
import icDownloadSrc from 'images/icons/ic_download.svg'

class DownloadsPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(globalActions.getConfigs())
  }

  onDownload = (e) => {

  }

  render() {
    const { configs } = this.props
    return (
      <div className="container-fluid downloads">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <h1 className="">{I18n.t('pages.downloads.configs.title')}</h1>

            <div className="table-responsive">
              <table className="table mt-30">
                <thead>
                  <tr>
                    <th className="font-weight-bold">Country</th>
                    <th className="font-weight-bold">Status</th>
                    <th className="font-weight-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(configs && configs.length > 0) ?
                    configs.map(item =>
                      <tr key={`invoice${item.id}`}>
                        <td>{item.title}</td>
                        <td>{item.status}</td>
                        <td className="text-right table-actions">
                          <a href={item.url} target="_blank" download>
                            <img src={icDownloadSrc} className="img-fluid" />
                          </a>
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
  const { configs } = state.global
  return {
    configs
  }
}

const connectedPage = connect(mapStateToProps)(DownloadsPage)
export { connectedPage as DownloadsPage }