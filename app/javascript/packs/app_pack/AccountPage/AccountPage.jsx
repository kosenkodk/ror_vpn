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
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7 mb-5">
            {/* <h2 className="pb-4">Account</h2> */}
            {/* <div className="mb-5">
              <h1 id="email">Email</h1>
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
            </div> */}

            <div className="mb-5">
              <h1>Username</h1>
              <div className="row">
                <div className="col-sm-5 align-self-center">
                  <label className="col-form-label">Email</label>
                </div>
                <div className="col">
                  <input type="string" name="email" className="form-control" id="email" value={user && user.email} onChange={this.handleChange} placeholder='Email' />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h1>Passwords</h1>
              <div className="row">
                <div className="col-sm-5 align-self-center">
                  <label className="col-form-label">Login password</label>
                </div>
                <div className="col">
                  <ModalPopup onClose={this.clearModalAlerts} id='changePasswordModal' isForm={true} title='Change login password' btnClasses={'btn-lg btn-block'} btnText={I18n.t('pages.account.change_password.button')}>
                    <ChangePasswordForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onChangePassword} />
                  </ModalPopup>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h1 id="password">Two-factor authentication</h1>

              <div className="row">
                <div className="col-sm-5 align-self-center">
                  <label className="col-form-label">Two-factor authentication</label>
                </div>
                <div className="col-auto">
                  <div class="mt-n1 custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" />
                    <label class="custom-control-label" for="customSwitch1"></label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h1 id="password">Recovery & notification</h1>
              <div class="border-left-pink">
                {/* <h5 id="caveat-with-anchors">WARNING: DELETION IS PERMANENT</h5> */}
                <p>
                  The selected method can be used to recover an account in the event your forget your password and to be notified about missed emails.
                </p>
              </div>

              <div className="row">
                <div className="col-sm-5 align-self-center">
                  <label className="col-form-label">Login email address</label>
                </div>
                <div className="col">
                  <input type="string" name="email" className="form-control" id="email" value={user && user.email} onChange={this.handleChange} placeholder='Email' />
                </div>
                <div className="col-auto">
                  <ModalPopup onClose={this.clearModalAlerts} id='changeEmailModal' isForm={true} title='Change login email' btnText={I18n.t('buttons.edit')} btnClasses={'btn-lg'}>
                    <ChangeEmailForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onChangeEmail} />
                  </ModalPopup>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-sm-5 align-self-center">
                  <label className="col-form-label">Allow password reset</label>
                </div>

                <div class="col">
                  <div class="mt-n1 custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" />
                    <label class="custom-control-label" for="customSwitch1"></label>

                    {/* <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" disabled id="customSwitch2" />
                      <label class="custom-control-label" for="customSwitch2">Disabled switch element</label>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <h1 id="delete">Delete Account</h1>
            <div class="border-left-pink col">
              {/* <h5 id="caveat-with-anchors">WARNING: DELETION IS PERMANENT</h5> */}
              <p>
                Deleting your account will permanently delete all data associated with it and cannot be recovered. You will no longe be able to use the same email.
              </p>
            </div>
            <ModalPopup onClose={this.clearModalAlerts} onBtnSave={this.onAccountDelete} id='deleteAccountModal' title='Delete you account' btnText={I18n.t('pages.account.delete.button')} btnClasses={'btn-lg'} btnCloseText={I18n.t('buttons.cancel')} btnSaveText={I18n.t('buttons.delete')}>
              <div class="border-left-pink">
                <h5 id="caveat-with-anchors">WARNING: DELETION IS PERMANENT</h5>
                <p>If you wish to delete this account in order to combine it with another one, do NOT delete it.
                  {/* <a>Learn more</a> */}
                </p>
              </div>
            </ModalPopup>
          </div>
        </div>
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