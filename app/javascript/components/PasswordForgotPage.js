import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import PasswordForgotForm from './PasswordForgotForm'
import FlashMessages from './sections/FlashMessages'
import { withRouter } from "react-router-dom";
import { postCsrfRequest, handleErrors } from 'helpers/http'

class PasswordForgotPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      notice: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email, password) {
    this.setState({ error: '', notice: '' })

    const data = { 'email': email }
    fetch(postCsrfRequest('/api/v1/forgot', 'POST', data))
      .then(handleErrors)
      .then((item) => {
        console.log('success', item)
        this.setState({ notice: item.message })
        this.props.history.push('/features')
        // this.props.history.push('/200')
      })
      .catch((response) => {
        response.json().then((item) => {
          console.log('error', item)
          this.setState({ error: item.message })
        })
        // this.props.history.push('/404')
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

            <div className="col-sm-8 offset-md-2 text-center">
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
}

export default withRouter(PasswordForgotPage)