import React from 'react'
import PropTypes from 'prop-types'
import SigninForm from './SigninForm'
import { withRouter } from "react-router-dom";
import I18n from 'i18n-js/index.js.erb'
import FlashMessages from './sections/FlashMessages'
import { postCsrfRequest, httpPlainRequest, handleErrors, errorMessage } from 'helpers/http'
import { config } from 'config';
import { Link } from 'react-router-dom'

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
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange() {
    let name = e.target.name
    let value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value

    this.setState({
      [name]: value
    })
  }

  handleFormSubmit(e, email, password) {
    e.preventDefault();

    // const data = { 'email': email, 'password': password }
    let data = {}
    let formData = new FormData(e.target);
    formData.forEach((value, key) => { data[key] = value });
    // const jsonData = JSON.stringify(data);

    // fetch(postCsrfRequest(`${config.apiUrl}/signin`, 'POST', data))
    fetch(httpPlainRequest(`${config.apiUrl}/signin`, 'POST', data))
      .then(handleErrors)
      .then((item) => this.responseSuccessful(item))
      .catch((error) => this.responseFailed(error, I18n.t('api.errors.something_went_wrong')));
  }

  responseSuccessful(response) {
    console.log('signinSuccessful', response)

    this.setState({ notice: response.notice, error: response.error })

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
        this.setState({ error: meResponse.message || '', notice: '' })
        // set data 
        this.props.setCurrentUser(meResponse, response.csrf)
        this.props.history.push(config.userUrlAfterSignin)
      })
      .catch((error) => {
        return this.responseFailed(error)
      });
  }

  responseFailed(error, message) {
    console.log('signinFailed', error, message)

    // method 1
    // errorMessage(error).then((message) => {
    //   // console.log(message)
    //   this.setState({ error: message })
    // })

    // method 2 (with async and await)
    // this.setState({ error: await errorMessage(error) })

    // method 3 (plain text only)
    this.setState({ error: (error && error.message) || message, notice: '' })

    // this.props.history.push('/404')
  }



  render() {
    // let formFields = {}
    // const { email, password } = this.state;
    return (
      <div className="container login">
        <div className="featurette text-center">
          <div className="row">

            <div className="col-md-8 offset-md-2 text-center">
              <h1 className="featurette-heading">
                {I18n.t('pages.login.title')}
              </h1>
              <p className="lead">
                {I18n.t('pages.login.do_not_have_an_account')}
                <Link to="/signup">{I18n.t("pages.signup.title")}</Link>
                {/* <a href="/signup"> {I18n.t("pages.signup.title")}</a> */}
              </p>
            </div>

            <div className="col-md-4 offset-md-4 text-center">
              <FlashMessages error={this.state.error} notice={this.state.notice} />
            </div>

            <div className="col-md-8 offset-md-2">
              <div className="text-right">
                <SigninForm form_action={this.props.form_action} forgot_pwd_path={this.props.forgot_pwd_path} handleFormSubmit={this.handleFormSubmit} />
              </div>
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <Link to="/forgot" className="trouble">{I18n.t("pages.login.form.login_trouble")}</Link>
                  {/* <a href="/forgot" className="trouble">{I18n.t("pages.login.form.login_trouble")}</a> */}
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
  componentWillUnmount() {
    this.props.handleIsFooterVisible(true)
  }
  componentDidMount() {
    // this.props.setAppState({bgClass:'bg1_cover'})
    this.props.handleIsFooterVisible(false)

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