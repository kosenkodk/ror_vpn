import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import PasswordResetForm from './PasswordResetForm'
import { postCsrfRequest, handleErrors } from 'helpers/http'
import FlashMessages from './sections/FlashMessages'
import { withRouter } from "react-router-dom";
import { config } from 'config';

class PasswordResetPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      notice: '',
      token: this.props.match.params.token
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, password, password_confirm) {
    e.preventDefault()
    const data = { 'password': password, 'password_confirm': password_confirm }
    const options = {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.props.appState.csrf
      },
      body: JSON.stringify(data)
    }

    // const token = get_from_local_storage

    fetch(postCsrfRequest(`${config.apiUrl}/password_resets/${this.state.token}`, 'PATCH', data))
      // fetch(`${config.apiUrl}/password_resets/${this.state.token}`, options)
      .then(handleErrors)
      .then((item, message) => {
        console.log('success', item, message)
        let notice = 'Your password has been reset successfully! Please sign in with your new password.'
        this.setState({ notice: notice, error: '' })
        // this.setState({ notice: item.message })
        // this.props.history.push('/reset_ok')
        // this.props.history.push('/200')
      })
      .catch((error) => {
        console.log('error', error.message)
        this.setState({ error: error.message, notice: '' })
        // this.setState({ error: response.statusText })
      });
  }

  checkPasswordToken() {
    fetch(`${config.apiUrl}/password_resets/${this.state.token}`)
      .catch(error => {
        // this.resetFailed(error)
        this.setState({ notice: '', error: '' })
        this.props.history.push('/forgot')
      })
  }

  render() {
    return (
      <div className="container reset_pwd">
        <div className="featurette text-center">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <h1 className="featurette-heading">
                {I18n.t('pages.reset_pwd.title')}
              </h1>
              <p className="lead">
                {I18n.t('pages.reset_pwd.subtitle')}
              </p>
            </div>

            <div className="col-sm-4 offset-md-4 text-center">
              <FlashMessages error={this.state.error} notice={this.state.notice} />
            </div>

            <div className="col-md-8 offset-md-2">
              <div className="text-right">
                <PasswordResetForm handleFormSubmit={this.handleFormSubmit} />
              </div>
            </div>

            <div className="col-md-12">
              {/* <img src={Image_mars_with_spaceship} className="img-fluid" /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.handleIsFooterVisible(false)
    this.checkPasswordToken()
  }
  componentWillUnmount() {
    this.props.handleIsFooterVisible(true)
  }
}

export default withRouter(PasswordResetPage)