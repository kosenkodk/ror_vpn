import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class SuccessPage extends React.Component {
  render() {
    return (
      <div className="container reset_pwd">
        <div className="featurette text-center">
          <div className="row">
            <div className="col-md-4 offset-md-4 text-center">
              <h1 className="featurette-heading">
                {I18n.t('pages.reset_pwd.success.title')}
              </h1>
              <p className="lead">
                {I18n.t('pages.reset_pwd.success.subtitle')}
              </p>
              <a href="/" className="btn  btn-outline-primary btn-block">{I18n.t('buttons.ok')}</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SuccessPage