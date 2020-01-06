import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { DeleteForm, ChangePasswordForm, ChangeEmailForm, CancelAccountForm } from './';
import { accountActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';
import { I18n } from 'helpers';
import { ModalPopup, AlertDismissible } from '../_components';
import ModalDialog from 'react-bootstrap/ModalDialog';
// import ModalVerticallyCentered from '../_components/ModalVerticallyCentered';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllowPasswordReset: this.props.isAllowPasswordReset,
      is2faEnabled: this.props.is2faEnabled,
      user: ''
    }
    this.onAccountDelete = this.onAccountDelete.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.clearModalAlerts = this.clearModalAlerts.bind(this);
    this.onCancelAccount = this.onCancelAccount.bind(this);

    this.allowPasswordReset = this.allowPasswordReset.bind(this);
    this.enable2FA = this.enable2FA.bind(this);
  }

  onCancelAccount(e) {
    e.preventDefault();
    const data = FormDataAsJsonFromEvent(e);
    this.props.dispatch(accountActions.cancelAccount(data));
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
    const data = FormDataAsJsonFromEvent(e);
    this.props.dispatch(accountActions.deleteAccount(data));
  }

  clearModalAlerts(e) { // clearModalAlerts = (e) => {
    e.preventDefault();
    this.props.dispatch(accountActions.clearAlerts());
  }

  allowPasswordReset(e) {
    this.setState({ isAllowPasswordReset: e.target.checked });
    // this.props.dispatch(accountActions.allowPasswordReset(e.target.checked)); //todo:
  }

  enable2FA(e) {
    this.setState({ is2faEnabled: e.target.checked });
    // this.props.dispatch(accountActions.enable2FA(e.target.checked)); //todo:
  }

  componentDidMount() {
    // this.getUser();
  }

  UNSAFE_componentWillUpdate() {
    // this.getUser();
  }

  getUser() {
    try {
      const itemFromLocalStorage = JSON.parse(localStorage.getItem('user'));
      this.setState({ user: itemFromLocalStorage });
      // console.log('getUser()', itemFromLocalStorage);
    } catch (e) {
      // console.log(e);
    }
  }

  componentDidUpdate() {
  }

  render() {
    const { loggingIn, user, userWithFreshInfo } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-7">
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
            <AlertDismissible />
            {/* <ModalVerticallyCentered /> */}
            <ModalDialog>Hi</ModalDialog>

            <div className="mb-60">
              <h1>Username</h1>

              <div className="row align-items-center">
                <div className="col-sm-5">
                  <label className="col-form-label">Email</label>
                </div>
                <div className="col">
                  <input type="string" className="form-control" defaultValue={user && user.email || ''} readOnly={true} placeholder='Email' />
                </div>
              </div>

              <div className="row align-items-center mt-10">
                <div className="col-sm-5">
                  <label className="col-form-label">Current plan</label>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center">
                    <p className="m-0 text-blue">
                      {(userWithFreshInfo && userWithFreshInfo.tariff_plan && userWithFreshInfo.tariff_plan.title) || (user.tariff_plan && user.tariff_plan.title) || 'Free '}
                      {/* {(this.state.user && this.state.user.tariff_plan && this.state.user.tariff_plan.title)} */}
                    </p>

                    <ModalPopup onClose={this.clearModalAlerts} id='cancelAccountModal' isForm={true} title={I18n.t('pages.account.cancel.title')}
                      aClasses={'ml-auto text-black'} aId='cancel_account_link' aUrl="#" aTitle={I18n.t('pages.account.cancel.title')} aText={I18n.t('pages.account.cancel.button')}>
                      <CancelAccountForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onCancelAccount} />
                    </ModalPopup>

                    {/* <Link to="#" className="ml-auto text-black">Cancel Account</Link> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-60">
              <h1>Passwords</h1>
              <div className="row align-items-center">
                <div className="col-sm-5">
                  <label className="col-form-label">Login password</label>
                </div>
                <div className="col">
                  <ModalPopup onClose={this.clearModalAlerts} id='changePasswordModal' isForm={true} title={I18n.t('pages.account.change_password.title')} btnClasses={'btn-block'} btnText={I18n.t('pages.account.change_password.button')}>
                    <ChangePasswordForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onChangePassword} />
                  </ModalPopup>
                </div>
              </div>
            </div>

            {/* <div className="mb-5">
              <h1 id="password">Two-factor authentication</h1>

              <div className="row">
                <div className="col-sm-5 align-self-center">
                  <label className="col-form-label">Two-factor authentication</label>
                </div>
                <div className="col-auto">
                  <div className="mt-n1 custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={this.enable2FA} checked={this.state.is2faEnabled} />
                    <label className="custom-control-label" htmlFor="customSwitch1"></label>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="mb-60">
              <h1 id="password">Recovery & notification</h1>
              <div className="border-left-pink">
                {/* <h5 id="caveat-with-anchors">WARNING: DELETION IS PERMANENT</h5> */}
                <p>
                  The selected method can be used to recover an account in the event your forget your password and to be notified about missed emails.
                </p>
              </div>

              <div className="row align-items-center">
                <div className="col-sm-5">
                  <label className="col-form-label">Login email address</label>
                </div>
                <div className="col">
                  <input type="string" className="form-control" value={user && user.email} readOnly placeholder='Email' />
                </div>
                <div className="col-auto">
                  <ModalPopup onClose={this.clearModalAlerts} id='changeEmailModal' isForm={true} title='Change login email' btnText={I18n.t('buttons.edit')} btnClasses={''}>
                    <ChangeEmailForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onChangeEmail} />
                  </ModalPopup>
                </div>
              </div>

              {/*
              <div className="row mt-2">
                <div className="col-sm-5 align-self-center">
                  <label className="col-form-label">Allow password reset</label>
                </div>

                <div className="col">
                  <div className="mt-n1 custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch2" onChange={this.allowPasswordReset} disabled={false} checked={this.state.isAllowPasswordReset} />
                    <label className="custom-control-label" htmlFor="customSwitch2"></label>
                  </div>
                </div>
              </div>
              */}

            </div>

            <div className="mb-60">
              <h1 id="delete">Delete Account</h1>
              <div className="border-left-pink col">
                {/* <h5 id="caveat-with-anchors">WARNING: DELETION IS PERMANENT</h5> */}
                <p>
                  Deleting your account will permanently delete all data associated with it and cannot be recovered. You will no longe be able to use the same email.
              </p>
              </div>
              <ModalPopup onClose={this.clearModalAlerts} isForm={true} onBtnSave={this.onAccountDelete} id='deleteAccountModal' title='Delete account' btnText={I18n.t('pages.account.delete.button')} btnClasses={''} btnCloseText={I18n.t('buttons.cancel')} btnSaveText={I18n.t('buttons.delete')}>
                <DeleteForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onAccountDelete} />
              </ModalPopup>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const userWithFreshInfo = state.users.user;
  const userWithFreshInfo = state.account.user;
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn, user, userWithFreshInfo
  };
}

AccountPage.defaultProps = {
  isAllowPasswordReset: true,
  is2faEnabled: false,
}

const connectedPage = connect(mapStateToProps)(AccountPage);
export { connectedPage as AccountPage }; 