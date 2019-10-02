import React from 'react'
import PropTypes from 'prop-types'
import SigninForm from './SigninForm'
import { withRouter } from "react-router-dom";
import I18n from 'i18n-js/index.js.erb'
import FlashMessages from './sections/FlashMessages'
import { postCsrfRequest, handleErrors, errorMessage } from 'helpers/http'
import { config } from 'config';

class SigninPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notice: '',
      error: ''
      //   email: props.email,
      //   password: props.password
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email, password) {
    e.preventDefault()
    this.setState({ notice: '', error: '' })

    const data = { 'email': email, 'password': password }

    fetch(postCsrfRequest(`${config.apiUrl}/signin`, 'POST', data))
      .then(handleErrors)
      .then((item) => this.responseSuccessful(item))
      .catch((error) => this.responseFailed(error, I18n.t('errors.something_went_wrong')));
  }

  responseSuccessful(response) {
    // console.log('signinSuccessful', response)

    this.setState({ notice: response.notice })
    this.setState({ error: response.error })

    // this.props.history.push('/features')
    // this.props.history.push('/200')

    if (!response.csrf) {
      return this.responseFailed(response)
    }

    fetch(`${config.apiUrl}/me`)
      // .then(handleErrors)
      .then((response) => response.json())
      .then((meResponse) => {
        console.log('/me', meResponse)
        this.setState({ error: meResponse.message || '' })
        // set data 
        this.props.setCurrentUser(meResponse, response.csrf)
        this.props.history.push(config.userUrlAfterSignin)
      })
      .catch((error) => {
        return this.responseFailed(error)
      });
  }

  responseFailed(error, message) {
    // method 1
    // errorMessage(error).then((message) => {
    //   // console.log(message)
    //   this.setState({ error: message })
    // })

    // method 2 (with async and await)
    // this.setState({ error: await errorMessage(error) })

    // method 3 (plain text only)
    this.setState({ error: (error && error.message) || message })

    // this.props.history.push('/404')
  }



  render() {
    // let formFields = {}
    // const { email, password } = this.state;
    return (
      <div className="login">
        <div className="featurette text-center">
          <div className="row">

            <div className="col-md-8 offset-md-2 text-center">
              <h1 className="featurette-heading">
                {I18n.t('pages.login.title')}
              </h1>
              <p className="lead">
                {I18n.t('pages.login.do_not_have_an_account')}
                <a href="/signup"> {I18n.t("pages.signup.title")}</a>
              </p>
            </div>

            <div className="col-md-4 offset-md-4 text-center">
              <FlashMessages error={this.state.error} notice={this.state.notice} />
            </div>

            <div className="col-md-8 offset-md-2">
              <div className="text-right">
                <SigninForm token={this.props.token} form_action={this.props.form_action} forgot_pwd_path={this.props.forgot_pwd_path} handleFormSubmit={this.handleFormSubmit} />
              </div>
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <a href="/forgot" className="trouble">{I18n.t("pages.login.form.login_trouble")}</a>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              {/* <%#= image_tag 'coming_soon/mars_with_spaceship.png', {class:'img-fluid'} #%> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.handleIsFooterVisible(this.props.isFooterVisible)

    // if (this.props.email || this.props.password) {
    //   console.log('use props')
    //   // this.setState({ features: this.props.features })
    //   return;
    // }

    // console.log('getting data from api...')

    // const url = "api/v1/signin";
    // fetch(url)
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then(response => this.setState({ features: response }))
    //   .catch((err) => {
    //     console.log(err)
    //   });
  }

}

SigninPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  form_action: PropTypes.string,
  forgot_pwd_path: PropTypes.string,
  token: PropTypes.string
};

export default withRouter(SigninPage)
// export default SigninPage