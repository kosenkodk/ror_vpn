import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'helpers';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import { connect } from 'react-redux';

class Code2faForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code2fa: '',
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
    const { code2fa } = this.state;
    const { dispatch, user, password } = this.props;
    if (code2fa) {
      dispatch(userActions.login({ email: user && user.email, password: password, code2fa: code2fa }));
    }
    e.preventDefault();
  }

  render() {
    const { loggingIn } = this.props;
    const { code2fa, submitted } = this.state;

    return (
      <form name="form" onSubmit={this.handleSubmit}>

        <div className={'form-group row align-items-center' + (submitted && !code2fa ? ' has-error' : '')}>
          <div className="col-sm-3">
            <label htmlFor='code2fa' className="col-form-label">
              Your Code
              {/* {I18n.t("pages.code2fa.form.your_verification_code")} */}
            </label>
          </div>
          <div className="col-sm-6">
            <input type="text" className="form-control" name="code2fa" value={code2fa} onChange={this.handleChange} placeholder={I18n.t("pages.code2fa.form.help.code2fa")} />
          </div>
          <div className="col-sm-3 align-self-center">
            {submitted && !code2fa &&
              <div className="help-block">Code is required</div>
            }
          </div>
        </div>

        {/* <div className="form-group row">
          <div className="col-sm-6 offset-sm-3">
            {I18n.t("pages.code2fa.form.help.trusted_device")}
            <Link to="/trusted_device" className="trouble">{I18n.t("pages.code2fa.form.help.learn_more")}</Link>
          </div>
        </div> */}

        <div className="form-group row">
          <div className="col-sm-6 offset-sm-3">
            <br />
            <button id="contact_submit" className="btn btn-outline-primary btn-block" disabled={loggingIn ? true : false}>
              {loggingIn && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {' ' + I18n.t('buttons.signin_securely')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

Code2faForm.propTypes = {
  code2fa: PropTypes.string,
};

function mapStateToProps(state) {
  const { loggingIn, user, password } = state.authentication;
  return {
    loggingIn, user, password
  };
}

const connectedPage = connect(mapStateToProps)(Code2faForm);
export { connectedPage as Code2faForm }; 