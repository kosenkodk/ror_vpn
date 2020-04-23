import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'helpers'
import FlashMessages from '../sections/FlashMessages'

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    // this.email = React.createRef()
    // this.password = React.createRef()
    // this.password_confirmation = React.createRef()
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-8 text-center offset-sm-2">
            <FlashMessages />
            {/* <%= render 'shared/flash_messages' %> */}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.signup.form.email_address')}</label>
          {/* <%= f.label t('pages.signup.form.email_address'), {class:'col-sm-3 col-form-label'} %> */}
          <div className="col-sm-6">
            <input type="email" name="email" onChange={this.props.onEmailChange} value={this.props.email} required={true} className="form-control" placeholder={I18n.t('pages.login.form.help.email')} />
            {/* <input type="email" onChange={this.props.onValueChange} value={this.props.email} required={true} className="form-control" ref={(input) => { this.email = input }} placeholder={I18n.t('pages.login.form.help.email')} /> */}
            {/* <%= f.text_field :email, required: false, type: :email, class: "form-control", placeholder: t('pages.login.form.help.email') %> */}
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.signup.form.password')}</label>
          {/* <%= f.label t('pages.signup.form.password'), {class:'col-sm-3 col-form-label'} %> */}
          <div className="col-sm-6">
            <input type="password" name="password" onChange={this.props.onPasswordChange} value={this.props.password} required={false} className="form-control" placeholder={I18n.t('pages.login.form.help.password')} />
            {/* <input type="password" required={false} className="form-control" ref={(input) => { this.password = input }} placeholder={I18n.t('pages.login.form.help.password')} /> */}
            {/* <%= f.text_field :password, required: false, type: :password, class: "form-control", placeholder: t('pages.login.form.help.password') %> */}
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.signup.form.password_confirmation')}</label>
          {/* <%= f.label t('pages.signup.form.password_confirmation'), {class:'col-sm-3 col-form-label'} %> */}
          <div className="col-sm-6">
            <input type="password" name="password_confirmation" onChange={this.props.onPasswordConfirmChange} value={this.props.password_confirmation} required={false} className="form-control" placeholder={I18n.t('pages.login.form.help.password')} />
            {/* <input type="password" required={false} className="form-control" ref={(input) => { this.password_confirmation = input }} placeholder={I18n.t('pages.login.form.help.password')} /> */}
            {/* <%= f.text_field :password_confirmation, required: false, type: :password, class: "form-control", placeholder: t('pages.login.form.help.password') %> */}
          </div>
          <div className="col-sm-3"></div>
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