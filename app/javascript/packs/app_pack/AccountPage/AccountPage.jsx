import React from 'react';
import { connect } from 'react-redux';
import { ChangePassword, ChangeEmail } from './';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggingIn } = this.props;
    return (
      <div className="shadow-vega bg-vega">
        <div className="col shadow-vega-bottom">
          <h2 className="pb-4 pt-2">Account</h2>
        </div>
        <div className="col mb-5"> {/* d-flex justify-content-lg-center"> */}
          <div className="section-scrollable p-4 ">
            <ChangeEmail idModal='changeEmail' />
            <ChangePassword idModal='changePassword' />
            <h4 id="delete">Delete Account</h4>
            <button className="btn btn-outline-pink active mb-5">Delete your account</button>
          </div>
        </div>
      </div>
    );
  }
}

AccountPage.defaultProps = {
  idModal: 'modal'
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedPage = connect(mapStateToProps)(AccountPage);
export { connectedPage as AccountPage }; 