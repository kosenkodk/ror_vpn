import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { I18n } from 'helpers';
import { Code2faForm } from './Code2faForm';
// import FlashMessages from './_components/FlashMessages';

class Code2faPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container login">
        <div className="featurette text-center vh-100">
          <div className="row h-50">
            <div className="col-md-12 align-self-end">
              <h1 className="featurette-heading">
                {I18n.t('pages.code2fa.title')}
              </h1>
              {/* <p className="lead">
                {I18n.t('pages.code2fa.check_device')}
              </p> */}
            </div>

            {/* <div className="col-md-4 offset-md-4 text-center">
              <FlashMessages error={this.state.error} notice={this.state.notice} />
            </div> */}

            <div className="col-md-8 offset-md-2 align-self-start">
              <div className="text-right">
                <Code2faForm />
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
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedPage = connect(mapStateToProps)(Code2faPage);
export { connectedPage as Code2faPage }; 