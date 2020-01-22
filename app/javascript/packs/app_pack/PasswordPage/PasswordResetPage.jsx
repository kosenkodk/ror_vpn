import React from 'react'
import { I18n } from 'helpers'
import PasswordResetForm from './PasswordResetForm'
import { httpPlainRequest, handleErrors } from 'helpers/http'
import FlashMessages from '../_sections/FlashMessages'
import { config } from 'config'
import { connect } from 'react-redux'

class PasswordResetPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      notice: '',
      token: this.props.token || this.props.match && this.props.match.params && this.props.match.params.token
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, password, password_confirmation) {
    e.preventDefault()
    const data = { 'password': password, 'password_confirmation': password_confirmation }
    const options = {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }

    fetch(httpPlainRequest(`${config.apiUrl}/password_resets/${this.state.token}`, 'PATCH', data))
      .then(handleErrors)
      .then((item, message) => {
        let notice = I18n.t('pages.reset_pwd.success.message')
        this.setState({ notice: notice, error: '' })
        // this.setState({ notice: item.message, error: '' })
        // this.props.history.push('/reset_ok')
      })
      .catch((error) => {
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
        <div className="featurette text-center vh-100">
          <div className="row align-items-center h-50"
          // style={{ minHeight: this.props.height / 2 }}
          >
            <div className="col-md-8 offset-md-2 text-center align-self-end">
              <h1 className="featurette-heading mb-3">
                {I18n.t('pages.reset_pwd.title')}
              </h1>
              <p className="lead mb-5">
                {I18n.t('pages.reset_pwd.subtitle')}
              </p>
            </div>
            {
              (this.state.error || this.state.notice) &&
              <div className="col-sm-4 offset-md-4 text-center">
                <FlashMessages error={this.state.error} notice={this.state.notice} />
              </div>
            }

            <div className="col-md-8 offset-md-2 align-self-start">
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
    // this.checkPasswordToken()
  }

}

// export { PasswordResetPage }
function mapStateToProps(state) {
  const { page } = state;
  const { height } = page;
  return {
    height
  };
}

const connectedPage = connect(mapStateToProps)(PasswordResetPage);
export { connectedPage as PasswordResetPage };
