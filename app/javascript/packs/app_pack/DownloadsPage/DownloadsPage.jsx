import React from 'react'
import { connect } from 'react-redux'
// import { NavHashLink as Link } from 'react-router-hash-link'

import { I18n } from 'helpers'
import { globalActions, alertActions } from '../_actions'
import icDownloadSrc from 'images/icons/ic_download.svg'
import { userService } from '../_services';

class DownloadsPage extends React.Component {

  componentDidMount() {
    this.props.dispatch(globalActions.getConfigs())
  }

  onDownload = (e, item) => {
    e.preventDefault()
    userService.getConfig(item.id)
      .then(response => {
        let data = {};
        try {
          data = JSON.parse(response);
        } catch (e) { }

        // network error
        if (!response.ok) {
          const error = (data && data.error) || (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.props.dispatch(alertActions.success('success'));
        return response.blob()
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = item.vpn_host || 'client.ovpn';
        const clickHandler = () => {
          setTimeout(() => {
            URL.revokeObjectURL(url);
            a.removeEventListener('click', clickHandler);
          }, 150);
        };
        a.addEventListener('click', clickHandler, false);
        a.click();
        return a;
      },
        error => {
          this.props.dispatch(alertActions.error(error));
        }
      );
  }

  render() {
    const { configs } = this.props
    return (
      <div className="container-fluid downloads">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            {/* <h1 className="">{I18n.t('pages.downloads.clients.title')}</h1> */}

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
                          <a
                            href="#"
                            onClick={(e) => this.onDownload(e, item)}
                          // href={item.url} target="_blank" download
                          >
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