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

        <div className="row">
          <div className="col-sm-8 offset-sm-2 text-center">
            <FlashMessages />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.reset_pwd.form.password')}</label>
          <div className="col-sm-6">
            <input id="user_password" type="password" name="user[password]" required={false} className="form-control" ref={(input) => { this.password = input }} placeholder={I18n.t('pages.login.form.help.password')} />
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.reset_pwd.form.password_confirm')}</label>
          <div className="col-sm-6">
            <input id="password_confirm" type="password" name="user[password_confirm]" required={false} className="form-control" ref={(input) => { this.password_confirm = input }} placeholder={I18n.t('pages.login.form.help.password')} />
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6 offset-sm-3">
            <br />
            <button onClick={(e) => { this.props.handleFormSubmit(e, this.password.value, this.password_confirm.value); }} className="btn btn-outline-primary btn-block">{I18n.t('buttons.reset_password')}</button>
          </div>
        </div>
      </form>
    )
  }
}

export default PasswordResetForm