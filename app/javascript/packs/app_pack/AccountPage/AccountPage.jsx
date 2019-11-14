import React from 'react';
import { connect } from 'react-redux';
import { ChangePasswordForm, ChangeEmailForm, ModalPopup } from './';
import { accountActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';
import { I18n } from 'helpers';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.onAccountDelete = this.onAccountDelete.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.clearModalAlerts = this.clearModalAlerts.bind(this);
  }

  onChangePassword(e) {
    e.preventDefault();
    const data = FormDataAsJsonFromEvent(e);
    this.props.dispatch(accountActions.changePassword(data));
  }

  onChangeEmail(e) {
    e.preventDefault();
    const data = FormDataAsJsonFromEvent(e);
    this.props.dispatch(accountActions.changeEmail(data));
  }

  onAccountDelete(e) {
    e.preventDefault();
    this.props.dispatch(accountActions.deleteAccount());
  }

  clearModalAlerts(e) { // clearModalAlerts = (e) => {
    e.preventDefault();
    this.props.dispatch(accountActions.clearAlerts());
  }

  render() {
    const { loggingIn, user } = this.props;
    return (
      <div className="container-section">
        {/* <h2 className="pb-4">Account</h2> */}
        <div className="mb-5">
          <h4 id="email">Email</h4>
          <div className="row">
            <div className="col-sm-4 align-self-center">
              <label className="col-form-label">Login email address: {user && user.email}</label>
            </div>
            <div className="col-sm-8">
              <ModalPopup onClose={this.clearModalAlerts} id='changeEmailModal' isForm={true} title='Change login email' btnText={I18n.t('pages.account.change_email.button')}>
                <ChangeEmailForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onChangeEmail} />
              </ModalPopup>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h4 id="password">Passwords</h4>
          <div className="row">
            <div className="col-sm-4 align-self-center">
              <label className="col-form-label">Login password</label>
            </div>
            <div className="col-sm-8">
              <ModalPopup onClose={this.clearModalAlerts} id='changePasswordModal' isForm={true} title='Change login password' btnText={I18n.t('pages.account.change_password.button')}>
                <ChangePasswordForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onChangePassword} />
              </ModalPopup>
            </div>
          </div>
        </div>

        <h4 id="delete">Delete Account</h4>
        <ModalPopup onClose={this.clearModalAlerts} onBtnSave={this.onAccountDelete} id='deleteAccountModal' title='Delete you account' btnText={I18n.t('pages.account.delete.button')} btnCloseText={I18n.t('buttons.no')} btnSaveText={I18n.t('buttons.yes')}>
          Are you sure ?
        </ModalPopup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn, user
  };
}

const connectedPage = connect(mapStateToProps)(AccountPage);
export { connectedPage as AccountPage }; 