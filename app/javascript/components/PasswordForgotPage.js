import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import PasswordForgotForm from './PasswordForgotForm'

class PasswordForgotPage extends React.Component {
  render() {
    return (
      <div className="container forgot_pwd">
        <div className="featurette text-center">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <h1 className="featurette-heading">
                {I18n.t('pages.forgot_pwd.title')}
              </h1>
              <p className="lead">
                {I18n.t('pages.forgot_pwd.subtitle')}
              </p>
            </div>

            <div className="col-md-8 offset-md-2 ">
              <div className="text-right">
                <PasswordForgotForm />
              </div>
            </div>

            <div className="col-md-12">
              {/* <img src={imageMarsWithSpaceship} className="img-fluid" /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordForgotPage