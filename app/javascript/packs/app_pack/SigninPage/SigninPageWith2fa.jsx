import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { I18n } from 'helpers'
import { SigninForm } from './SigninForm'
import { Code2faPage } from '../Code2faPage/Code2faPage';
// import FlashMessages from './_components/FlashMessages'

class SigninPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {user && user.is2fa ?
          <Code2faPage />
          :
          <div className="container login">
            <div className="featurette text-center vh-100">
              <div className="row h-50">
                <div className="col-md-12 align-self-end">
                  <h1 className="featurette-heading">
                    {I18n.t('pages.login.title')}
                  </h1>
                  <p className="lead">
                    {I18n.t('pages.login.do_not_have_an_account')} <Link to="/signup" className="trouble">{I18n.t("pages.signup.title")}</Link>
                    {/* <a href="/signup"> {I18n.t("pages.signup.title")}</a> */}
                  </p>
                </div>

                {/* <div className="col-md-4 offset-md-4 text-center">
              <FlashMessages error={this.state.error} notice={this.state.notice} />
            </div> */}

                <div className="col-md-8 offset-md-2 align-self-start">
                  <div className="text-right">
                    <SigninForm />
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
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn, user
  };
}

const connectedPage = connect(mapStateToProps)(SigninPage);
export { connectedPage as SigninPage }; 