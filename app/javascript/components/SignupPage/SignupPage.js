import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import I18n from 'i18n-js/index.js.erb'

import SignupForm from './SignupForm'
import Plans from './Plans'
import PaymentMethods from './PaymentMethods'

import imgStep1 from 'images/signup/step1'
import imgStep2 from 'images/signup/step2'
import imgStep3 from 'images/signup/step3'

class SignupPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      password_confirm: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  onEmailChange(key, event) {
    console.log('onEmailChange', key, event.target.value)
    this.setState({ [key]: event.target.value })
  }

  onPasswordChange(key, event) {
    console.log('onPasswordChange', key, event.target.value)
    this.setState({ [key]: event.target.value })
  }

  onPasswordConfirmChange(key, event) {
    console.log('onPasswordConfirmChange', key, event.target.value)
    this.setState({ [key]: event.target.value })
  }

  handleFormSubmit(e, email, password) {
    console.log(email, password)

    e.preventDefault()

    /*return;

    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    // console.log('csrf:' + csrf)
    // console.log('csrf token:' + this.props.token)
    const postData = { 'email': email, 'password': password }
    fetch('/api/v1/signup', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, cors, *same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // same-origin, include, *same-origin, omit
      // redirect: 'follow', // manual, *follow, error,
      // referrer: 'no-referrer', // no-referrer, *client
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify(postData), // data type should the same value as Content-Type header
    }).then((response) => { return response.json() })
      .then((item) => {
        console.log('success', item)
        // this.addNewItem(item)
        // navigate to the admin panel
        // this.props.history.push('/tariff_plans') # TODO: will implement react component
        this.props.history.push('/features')
      }).catch((err) => {
        console.log(err)
        this.props.history.push('/')
      });*/
  }

  render() {

    return (
      <form className="container">
        <div className="row signup text-center">
          <div className="col-md-8 offset-md-2">
            <h1 className="m-0">
              {I18n.t('pages.signup.steps.title1')}
            </h1>

            <p className="">
              <a href="#step2" id="step1">
                <img src={imgStep1} className="img-fluid" />
              </a>
              {/* <%= link_to image_tag('signup/step1.png', class:'img-fluid'), '#step2', {id: 'step1'} %> */}
            </p>
          </div>

          <div className="col-md-8 offset-md-2">
            <div className="text-right">
              <SignupForm handleFormSubmit={this.handleFormSubmit}
                email={this.state.email} onEmailChange={this.onEmailChange.bind(this, 'email')}
                password={this.state.password} onPasswordChange={this.onPasswordChange.bind(this, 'password')}
                password_confirm={this.state.password_confirm} onPasswordConfirmChange={this.onPasswordConfirmChange.bind(this, 'password_confirm')}
              />
            </div>
          </div>

          <div className="col-md-12">
            <h1 className="m-0 pt-0">
              {I18n.t('pages.signup.steps.title2')}
            </h1>
            <p className="mb-4">
              <a href="#step3" id="step2">
                <img src={imgStep2} className="img-fluid" />
              </a>
              {/* <%= link_to image_tag('signup/step2.png', class:'img-fluid'), '#step3', {id: 'step2'} %> */}
            </p>
            <div className="container">
              <Plans />
              {/* <%= render partial: 'auth/step2_plans', locals: {items: @plans } %> */}
            </div>
          </div>

          <div className="col-md-12">
            <h1 className="m-0">
              {I18n.t('pages.signup.steps.title3')}
            </h1>
            <p className="mb-4">
              <a href="#" id="step3">
                <img src={imgStep3} className="img-fluid" />
              </a>
              {/* <%= link_to image_tag('signup/step3.png', class:'img-fluid'), '#', {id: 'step3'} %> */}
            </p>
          </div>

          <div className="col-md-12">
            <PaymentMethods />
          </div>
        </div>
      </form>
    );
  }

}

SignupPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  password_confirm: PropTypes.string,
};

export default withRouter(SignupPage)
