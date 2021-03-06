import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'helpers';
import { postCsrfRequest, handleErrors, errorMessage } from 'helpers/http';
import { config } from 'config';
import FlashMessages from '../_sections/FlashMessages';

import SignupForm from './SignupForm';
import Plans from './Plans';
import PaymentMethods from './PaymentMethods';

import imgStep1 from 'images/signup/step1.svg';
import imgStep2 from 'images/signup/step2.svg';
import imgStep3 from 'images/signup/step3.svg';
import { connect } from 'react-redux';
import { userActions, alertActions } from '../_actions';

class SignupPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notice: '',
      error: '',

      email: '',
      password: '',
      password_confirmation: '',

      tariff_plan_id: '',

      payment_method_id: '',
      card_number: 0,
      holder_name: '',
      month: 0,
      year: 0,
      cvc: 0,
      rid: props.match.params.rid,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onEmailChange(key, event) {
    this.setState({ [key]: event.target.value });
  }

  onPasswordChange(key, event) {
    this.setState({ [key]: event.target.value });
  }

  onPasswordConfirmChange(key, event) {
    this.setState({ [key]: event.target.value });
  }

  onSignupChange() {
    //TODO: onSignupChange instead of these: onEmailChange, onPasswordChange, onPasswordConfirmChange (example: onPaymentMethodChange)
  }

  onPlanChange(e, id) {
    // console.log('onPlanChange id:', id)
    this.setState({ tariff_plan_id: id });
    if (e) e.preventDefault();
  }

  onPaymentMethodChange(id, card_number, holder_name, month, year, cvc) {
    // console.log('onPaymentMethodChange', id, card_number, holder_name, month, year, cvc)
    this.setState({
      payment_method_id: id,
      card_number: card_number,
      holder_name: holder_name,
      month: month,
      year: year,
      cvc: cvc
    });
  }

  onFormSubmit(e) {
    this.props.dispatch(userActions.signup(this.state));
    e.preventDefault();
    return;

    this.setState({ notice: '', error: '' });
    const data = this.state;

    fetch(postCsrfRequest(`${config.apiUrl}/signup`, 'POST', data))
      .then(handleErrors)
      .then((item) => this.responseSuccessful(item))
      .catch((error) => this.responseFailed(error));
    e.preventDefault();
  }

  responseSuccessful(response) {
    this.setState({ notice: response.notice, error: response.error });

    if (!response.csrf) {
      return this.responseFailed(response);
    }

    localStorage.setItem('csrf', JSON.stringify(response.csrf));

    fetch(`${config.apiUrl}/me`)
      .then(handleErrors)
      .then((meResponse) => {
        this.setState({ error: meResponse.message || '' })
        localStorage.setItem('user', JSON.stringify(meResponse));
        // this.props.setCurrentUser(meResponse, response.csrf)
        this.props.history.push(config.userUrlAfterSignin)
      })
      .catch((error) => {
        return this.responseFailed(error)
      });
  }

  responseFailed(error) {
    this.setState({ error: errorMessage(error) });
    // unset current user
    localStorage.removeItem('csrf');
    localStorage.removeItem('user');
    // this.props.unsetCurrentUser()
  }

  componentDidMount() {
    this.isSignedIn();
    if (this.state.rid) {
      fetch(`${config.apiUrl}/refer_friend/check_refer_code/${this.state.rid}`)
        .then(handleErrors)
        .then((response) => {
          this.setState({ success: response.success || '' })
          this.props.dispatch(alertActions.error(response.error))
        })
        .catch((error) => {
          this.setState({ error: error || '' })
        });
    }
  }

  componentDidUpdate() {
    this.isSignedIn();
  }

  isSignedIn() {
    if (this.props.isSignedIn) {
      this.props.history.push(config.userUrlAfterSignin);
    }
  }

  render() {
    const { error } = this.props;
    return (
      <form className="container">
        {/* <div className="row">
          <div className="col-md-12">
            <FlashMessages error={error || this.state.error && this.state.error} notice={this.state.notice && this.state.notice} />
          </div>
        </div> */}
        <div className="row signup text-center">
          <div className="col-md-8 offset-md-2">
            <h1 className="m-0">
              {I18n.t('pages.signup.steps.title1')}
            </h1>
            <p className="">
              <img src={imgStep1} className="img-fluid" />
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
            <h1 className="m-0 pt-4">
              {I18n.t('pages.signup.steps.title2')}
            </h1>
            <p className="mb-4">
              <img src={imgStep2} className="img-fluid" />
            </p>
            <div className="container">
              <Plans onPlanChange={this.onPlanChange.bind(this)} />
            </div>
          </div>

          <div className="col-md-12">
            <h1 className="m-0 pt-4">
              {I18n.t('pages.signup.steps.title3')}
            </h1>
            <p className="mb-4">
              <img src={imgStep3} className="img-fluid" />
            </p>
          </div>

          <div className="col-md-12">
            <PaymentMethods
              onFormSubmit={this.onFormSubmit}
              onPaymentMethodChange={this.onPaymentMethodChange.bind(this)}
            />
          </div>
          <div className="col-md-12 pt-4">
            <FlashMessages error={error || this.state.error && this.state.error} notice={this.state.notice && this.state.notice} />
          </div>
        </div>
      </form>
    );
  }
}

SignupPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  password_confirmation: PropTypes.string,
};


function mapStateToProps(state) {
  const { loggingIn, error } = state.authentication;
  return {
    loggingIn, error
  };
}

const connectedPage = connect(mapStateToProps)(SignupPage);
export { connectedPage as SignupPage }; 