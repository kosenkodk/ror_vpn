import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import { withRouter } from "react-router-dom";
import I18n from 'i18n-js/index.js.erb'
import FlashMessages from './sections/FlashMessages'
import { postCsrfRequest, handleErrors } from 'helpers/http'

class Login extends React.Component {

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

    fetch(postCsrfRequest('/api/v1/login', 'POST', data))
      .then(handleErrors)
      .then((item) => {
        this.setState({ notice: item.message })

        // this.props.history.push('/features')
        // this.props.history.push('/200')
      })
      .catch((error) => {
        // api error
        try {
          error.then(item => {
            this.setState({ error: item.message })
          })
        } catch (e) {
          this.setState({ error: e })
        }

        // network error
        if (error instanceof TypeError) {
          if (error.length > 0)
            this.setState({ error: error })
        }

        // this.props.history.push('/404')
      });
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
                <LoginForm token={this.props.token} form_action={this.props.form_action} forgot_pwd_path={this.props.forgot_pwd_path} handleFormSubmit={this.handleFormSubmit} />
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

    // const url = "api/v1/login";
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

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  form_action: PropTypes.string,
  forgot_pwd_path: PropTypes.string,
  token: PropTypes.string
};

export default withRouter(Login)
// export default Login