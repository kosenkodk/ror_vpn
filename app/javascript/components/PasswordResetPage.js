import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import PasswordResetForm from './PasswordResetForm'

class PasswordResetPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email, password) {
    console.log(email, password)
  }

  render() {
    return (
      <div class="container reset_pwd">
        <div class="featurette text-center">
          <div class="row">
            <div class="col-md-8 offset-md-2 text-center">
              <h1 class="featurette-heading">
                {I18n.t('pages.reset_pwd.title')}
              </h1>
              <p class="lead">
                {I18n.t('pages.reset_pwd.subtitle')}
              </p>
            </div>

            <div class="col-md-8 offset-md-2">
              <div class="text-right">
                <PasswordResetForm handleFormSubmit={this.handleFormSubmit} />
              </div>
            </div>

            <div class="col-md-12">
              {/* <img src={Image_mars_with_spaceship} className="img-fluid" /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordResetPage