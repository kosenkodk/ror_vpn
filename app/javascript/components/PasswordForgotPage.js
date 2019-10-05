import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import PasswordForgotForm from './PasswordForgotForm'
import FlashMessages from './sections/FlashMessages'
import { withRouter } from "react-router-dom";
import { postCsrfRequest, httpPlainRequest, httpSecuredRequest, handleErrors } from 'helpers/http'
import { config } from 'config';

class PasswordForgotPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      notice: '',
      csrf: props.appState.csrf,
      token: props.appState.token,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email) {
    let csrf_meta = document.querySelector("meta[name='csrf-token']").getAttribute("content"); //authenticity_token
    let csrf_app = this.state.token //authenticity_token
    let csrf_from_api = this.state.csrf
    // console.log('csrf_meta: ', csrf_meta, '\ncsrf_app: ', csrf_app, '\ncsrf_from_api: ', csrf_from_api)

    const data = { 'email': email }
    // fetch(httpPlainRequest(`http://localhost:3000/password_resets`, 'POST', data))
    // fetch(httpPlainRequest(`${config.apiUrl}/password_resets`, 'POST', data))
    // fetch(httpSecuredRequest(`${config.apiUrl}/password_resets`, 'POST', data, csrf_from_api || csrf_app || csrf_meta))
    fetch(httpSecuredRequest(`${config.apiUrl}/password_resets`, 'POST', data, csrf_from_api))
      // fetch(postCsrfRequest(`${config.apiUrl}/password_resets`, 'POST', data))
      // fetch(`${config.apiUrl}/password_resets`, options)
      .then(handleErrors)
      .then((item, message) => {
        console.log('success', item, message)
        let notice = 'Email with password reset instructions had been sent.'
        this.setState({ notice: notice, error: '' })
        // this.setState({ notice: item.message })
        // this.props.history.push('/reset')
        // this.props.history.push('/200')
      })
      .catch((error) => {
        console.log('error', error.message)
        this.setState({ error: error.message, notice: '' })

        // this.setState({ error: response.statusText })
      });

    e.preventDefault();
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
              <FlashMessages error={this.state.error} notice={this.state.notice} />
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
    this.props.handleIsFooterVisible(false)
  }
  componentWillUnmount() {
    this.props.handleIsFooterVisible(true)
  }
}

export default withRouter(PasswordForgotPage)