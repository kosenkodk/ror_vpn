import React from 'react'
import PropTypes from 'prop-types'
import I18n from 'i18n-js/index.js.erb'
import { Link } from 'react-router-dom'
import { userActions } from '../_actions';
import { connect } from 'react-redux';

class SigninForm extends React.Component {

  constructor(props) {

    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }

    e.preventDefault();
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;

    return (
      <form name="form" onSubmit={this.handleSubmit}>

        <div className={'form-group row' + (submitted && !email ? ' has-error' : '')}>
          <div className="col-sm-3">
            <label htmlFor='email' className="col-form-label">Email address</label>
          </div>
          <div className="col-sm-6">
            {/* <input type='hidden' name='authenticity_token' value={this.props.appState.csrf} /> */}
            <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} placeholder='Enter the email' />
          </div>
          <div className="col-sm-3 align-self-center">
            {submitted && !email &&
              <div className="help-block">Email is required</div>
            }
          </div>
        </div>

        <div className={'form-group row' + (submitted && !password ? ' has-error' : '')}>
          <div className="col-sm-3">
            <label htmlFor="password" className="col-form-label">Password</label>
          </div>
          <div className="col-sm-6">
            <div className="input-group">
              <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder='Enter the password' />
              <div className="input-group-append">
                <span className="input-group-text" id="forgot-pwd-addon">
                  <Link to="/forgot">
                    {I18n.t('pages.login.form.forgot_pwd')}
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-3 align-self-center">
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6 offset-sm-3">
            <br />
            <button className="btn btn-outline-primary btn-block">{I18n.t('buttons.submit')}</button>

            {loggingIn &&
              <div className="text-center">
                <div className="spinner-border text-center" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          </div>
        </div>
      </form >
    );
  }

  componentDidMount() {
  }

}

SigninForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedSigninFormPage = connect(mapStateToProps)(SigninForm);
export { connectedSigninFormPage as SigninForm }; 