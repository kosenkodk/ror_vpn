import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";
import I18n from 'i18n-js/index.js.erb'
import { postCsrfRequest, handleErrors, errorMessage } from 'helpers/http'
import config from 'config';
import FlashMessages from '../sections/FlashMessages'

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
      notice: '',
      error: '',

      email: '',
      password: '',
      password_confirmation: '',

      plan: 0,

      payment_method: 0,

      card_number: 0,
      holder_name: '',
      month: 0,
      year: 0,
      cvc: 0
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
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

  onSignupChange() {
    //TODO: onSignupChange instead of these: onEmailChange, onPasswordChange, onPasswordConfirmChange (example: onPaymentMethodChange)
  }

  onPlanChange(e, id) {
    console.log('onPlanChange', id)
    this.setState({
      plan: id
    })
    e.preventDefault()
  }

  onPaymentMethodChange(id, card_number, holder_name, month, year, cvc) {
    console.log('onPaymentMethodChange', id, card_number, holder_name, month, year, cvc)
    this.setState({
      payment_method: id,
      card_number: card_number,
      holder_name: holder_name,
      month: month,
      year: year,
      cvc: cvc
    })
  }

  onFormSubmit(e) {
    console.log('onFormSubmit', this.state)

    this.setState({ notice: '', error: '' })

    const data = this.state

    fetch(postCsrfRequest(`${config.apiUrl}/signup`, 'POST', data))
      .then(handleErrors)
      .then((item) => this.responseSuccessful(item))
      .catch((error) => this.responseFailed(error));

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

  responseSuccessful(response) {
    console.log('responseSuccessful', response)

    this.setState({ notice: response.notice })
    this.setState({ error: response.error })


    if (!response.csrf) {
      return this.responseFailed(response)
    }

    fetch('/api/v1/me')
      // .then(handleErrors)
      .then((response) => response.json())
      .then((meResponse) => {
        console.log('/me', meResponse)
        this.setState({ error: meResponse.message || '' })
        // set data 
        this.props.setCurrentUser(meResponse, response.csrf)
        this.props.history.push('/features')
      })
      .catch((error) => {
        return this.responseFailed(error)
      });
  }

  responseFailed(error) {
    this.setState({ error: errorMessage(error) })
    //unset current user
    this.props.unsetCurrentUser()
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.isSignedIn()
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
    this.isSignedIn()
  }

  isSignedIn() {
    console.log('isSignedIn', this.props.isSignedIn)
    if (this.props.isSignedIn) {
      this.props.history.push('/features')
    }
  }

  render() {

    return (
      <form className="container">
        <div className="row">
          <div className="col-md-12">
            <FlashMessages error={this.state.error} notice={this.state.notice} />
          </div>
        </div>
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
                password_confirmation={this.state.password_confirmation} onPasswordConfirmChange={this.onPasswordConfirmChange.bind(this, 'password_confirmation')}
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
              <Plans onPlanChange={this.onPlanChange.bind(this)} />
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
            <PaymentMethods
              onFormSubmit={this.onFormSubmit}
              onPaymentMethodChange={this.onPaymentMethodChange.bind(this)}
            />
          </div>
          <div className="col-md-12 pt-4">
            <FlashMessages error={this.state.error} notice={this.state.notice} />
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
