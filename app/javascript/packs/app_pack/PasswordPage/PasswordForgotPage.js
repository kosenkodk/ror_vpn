import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import PasswordForgotForm from './PasswordForgotForm'
import FlashMessages from '../_sections/FlashMessages'
import { withRouter } from "react-router-dom";
import { postCsrfRequest, httpPlainRequest, httpSecuredRequest, handleErrors } from 'helpers/http'
import { config } from 'config';

class PasswordForgotPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      notice: '',
      csrf: props.appState && props.appState.csrf && props.appState.csrf,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email) {
    e.preventDefault()
    const data = { 'email': email }
    // fetch(httpPlainRequest(`${config.apiUrl}/password_resets`, 'POST', data))
    fetch(httpSecuredRequest(`${config.apiUrl}/password_resets`, 'POST', data, this.state.csrf))
      // fetch(postCsrfRequest(`${config.apiUrl}/password_resets`, 'POST', data))
      .then(handleErrors)
      .then((item, message) => {
        // console.log('success', item, message)
        let notice = I18n.t('pages.forgot_pwd.success.message')
        this.setState({ notice: notice, error: '' })
        // this.setState({ notice: item.message, error: '' })
      })
      .catch((error) => {
        // console.log('error', error.message)
        this.setState({ error: error.message, notice: '' })
        // this.setState({ error: response.statusText, notice: '' })
      });
  }

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

            <div className="col-sm-4 offset-md-4 text-center">
              <FlashMessages error={this.state && this.state.error && this.state.error} notice={this.state && this.state.notice && this.state.notice} />
            </div>

            <div className="col-md-8 offset-md-2 ">
              <div className="text-right">
                <PasswordForgotForm handleFormSubmit={this.handleFormSubmit} />
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

  componentDidMount() {
    // this.props.handleIsFooterVisible(false)
  }
  componentWillUnmount() {
    // this.props.handleIsFooterVisible(true)
  }
}

export { PasswordForgotPage }