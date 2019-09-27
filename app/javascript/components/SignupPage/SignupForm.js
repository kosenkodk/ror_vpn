import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'i18n-js/index.js.erb'
import FlashMessages from '../sections/FlashMessages'

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.email = React.createRef()
    this.password = React.createRef()
    this.password_confirm = React.createRef()
  }

  render() {
    return (
      <React.Fragment>
        <div class="row">
          <div class="col-sm-8 text-center offset-sm-2">
            <FlashMessages />
            {/* <%= render 'shared/flash_messages' %> */}
          </div>
        </div>

        <div class="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.signup.form.email_address')}</label>
          {/* <%= f.label t('pages.signup.form.email_address'), {class:'col-sm-3 col-form-label'} %> */}
          <div class="col-sm-6">
            <input type="email" required={true} className="form-control" ref={(input) => { this.email = input }} placeholder={I18n.t('pages.login.form.help.email')} />
            {/* <%= f.text_field :email, required: false, type: :email, class: "form-control", placeholder: t('pages.login.form.help.email') %> */}
          </div>
          <div class="col-sm-3"></div>
        </div>

        <div class="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.signup.form.password')}</label>
          {/* <%= f.label t('pages.signup.form.password'), {class:'col-sm-3 col-form-label'} %> */}
          <div class="col-sm-6">
            <input type="password" required={false} className="form-control" ref={(input) => { this.password = input }} placeholder={I18n.t('pages.login.form.help.password')} />
            {/* <%= f.text_field :password, required: false, type: :password, class: "form-control", placeholder: t('pages.login.form.help.password') %> */}
          </div>
          <div class="col-sm-3"></div>
        </div>

        <div class="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.signup.form.password_confirm')}</label>
          {/* <%= f.label t('pages.signup.form.password_confirm'), {class:'col-sm-3 col-form-label'} %> */}
          <div class="col-sm-6">
            <input type="password_confirm" required={false} className="form-control" ref={(input) => { this.password_confirm = input }} placeholder={I18n.t('pages.login.form.help.password')} />
            {/* <%= f.text_field :password_confirm, required: false, type: :password, class: "form-control", placeholder: t('pages.login.form.help.password') %> */}
          </div>
          <div class="col-sm-3"></div>
        </div>
      </React.Fragment>
    )
  }

}

SignupForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  // handleFormSubmit: PropTypes.function
};

export default SignupForm