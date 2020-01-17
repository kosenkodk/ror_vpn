import React from 'react'
import { I18n } from 'helpers'
import FlashMessages from '../_sections/FlashMessages'

class PasswordForgotForm extends React.Component {

  constructor(props) {
    super(props);
    this.email = React.createRef()
  }

  render() {
    return (
      <form>
        <div className="row">
          <div className="col-sm-8 offset-sm-2 text-center">
            <FlashMessages />
          </div>
        </div>

        <div className="form-group row align-items-center">
          <label className="col-sm-3 col-form-label">{I18n.t('pages.login.form.email_address')}</label>
          <div className="col-sm-6">
            <input id="user_email" type="email" required={false} className="form-control" ref={(input) => { this.email = input }} placeholder={I18n.t('pages.login.form.help.email')} />
          </div>
          <div className="col-sm-3"></div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6 offset-sm-3">
            <br />
            <button onClick={(e) => { this.props.handleFormSubmit(e, this.email.value); }} className="btn btn-outline-primary btn-block">{I18n.t('buttons.submit')}</button>
          </div>
        </div>
      </form>
    )
  }
}

export default PasswordForgotForm