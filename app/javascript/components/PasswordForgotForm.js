import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import FlashMessages from './sections/FlashMessages'

class PasswordForgotPage extends React.Component {
  render() {
    return (
      <form>
        {/* <%= form_for @user, url: forgot_pwd_path, remote: true do | f | %> */}
        <div className="row">
          <div className="col-sm-8 offset-sm-2 text-center">
            <FlashMessages />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.login.form.email_address')}</label>
          <div className="col-sm-6">
            <input className="form-control" ref={(input) => { this.email = input }} placeholder={I18n.t('pages.login.form.help.email')} />
            {/* <%= f.text_field :email, required: false, type: :email, class: "form-control", placeholder: t('pages.login.form.help.email') %> */}
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6 offset-sm-3">
            <br />
            <button onClick={(e) => { this.props.handleFormSubmit(e, this.email.value, this.password.value); }} className="btn btn-outline-primary btn-block">{I18n.t('buttons.submit')}</button>
            {/* <%=f.submit(t("buttons.submit"), {class:'btn btn-outline-primary btn-block'})%> */}
          </div>
        </div>

        {/* <% end %> */}
      </form>
    )
  }
}

export default PasswordForgotPage