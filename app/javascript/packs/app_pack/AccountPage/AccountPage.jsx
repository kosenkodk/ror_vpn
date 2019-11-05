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
      <div className="col shadow-vega bg-vega p-4" > {/* d-flex justify-content-lg-center"> */}
        <div className="container-section">
          <h2>Account</h2>
          <ChangeEmail idModal='changeEmail' />
          <ChangePassword idModal='changePassword' />
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