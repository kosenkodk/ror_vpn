import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import PasswordForgotForm from './PasswordForgotForm'
import FlashMessages from './sections/FlashMessages'
import { withRouter } from "react-router-dom";
import { postCsrfRequest, handleErrors } from 'helpers/http'
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

    console.log('handleFormSubmit token', this.state.token)
    const data = { 'email': email }
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // 'Referrer Policy': 'no-referrer-when-downgrade',
        'X-CSRF-Token': this.state.token
      },
      body: JSON.stringify(data)
    }
    // fetch(postCsrfRequest(`${config.apiUrl}/password_resets`, 'POST', data))
    fetch(`${config.apiUrl}/password_resets`, options)
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
    let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    this.setState({ token: this.state.token || csrf })
    console.log('handlcomponentDidMount  token', this.state.token)
    // document.querySelector("meta[name='csrf-token']").getAttribute("content")
    const data = {}
    const options = {
      method: 'POST',
      // credentials: 'same-origin', // same-origin, include, *same-origin, omit
      // mode: 'cors', // no-cors, cors, *same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // same-origin, include, *same-origin, omit
      // redirect: 'follow', // manual, *follow, error,
      // referrer: 'no-referrer', // no-referrer, *client
      headers: {
        'Content-Type': 'application/json',
        // 'Referrer Policy': 'no-referrer-when-downgrade',
        'X-CSRF-Token': this.state.token
      },
      body: JSON.stringify(data)
    }

    fetch(postCsrfRequest(`${config.apiUrl}/refresh`, 'POST', data))
      // fetch(`${config.apiUrl}/refresh`, options)
      .then(handleErrors)
      .then((item, message) => {
        console.log('success', item, message)
        let notice = 'Email with password reset instructions had been sent.'
        this.setState({ notice: notice, error: '' })
        this.setState({ token: item && item.csrf })
        // this.setState({ notice: item.message })
        // this.props.history.push('/reset')
        // this.props.history.push('/200')
      })
      .catch((error) => {
        console.log('error', error.message)
        this.setState({ error: error.message, notice: '' })

        // this.setState({ error: response.statusText })
      });
  }
  componentWillUnmount() {
    this.props.handleIsFooterVisible(true)
  }
}

export default withRouter(PasswordForgotPage)