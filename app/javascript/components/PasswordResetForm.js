import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import FlashMessages from './sections/FlashMessages'

class PasswordResetForm extends React.Component {

  constructor(props) {
    super(props);
    this.password_confirm = React.createRef()
    this.password = React.createRef()
  }

  render() {

    return (
      <form>

        <div class="row">
          <div class="col-sm-8 offset-sm-2 text-center">
            <FlashMessages />
          </div>
        </div>

        <div class="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.reset_pwd.form.password')}</label>
          <div class="col-sm-6">
            <input type="password" required="false" className="form-control" ref={(input) => { this.password = input }} placeholder={I18n.t('pages.login.form.help.password')} />
          </div>
          <div class="col-sm-3"></div>
        </div>

        <div class="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.reset_pwd.form.password_confirm')}</label>
          <div class="col-sm-6">
            <input type="password" required="false" className="form-control" ref={(input) => { this.password_confirm = input }} placeholder={I18n.t('pages.login.form.help.password')} />
          </div>
          <div class="col-sm-3"></div>
        </div>

        <div class="form-group row">
          <div class="col-sm-6 offset-sm-3">
            <br />
            <button onClick={(e) => { this.props.handleFormSubmit(e, this.password.value, this.password_confirm.value); }} className="btn btn-outline-primary btn-block">{I18n.t('buttons.reset_password')}</button>
          </div>
        </div>
      </form>
    )
  }
}

export default PasswordResetForm