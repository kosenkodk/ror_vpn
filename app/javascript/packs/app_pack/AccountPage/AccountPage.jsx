import React from 'react';
import { connect } from 'react-redux';
import { ChangePassword } from './';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggingIn } = this.props;
    return (
      <React.Fragment>
        <ChangePassword idModal='changePassword' />
      </React.Fragment>
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