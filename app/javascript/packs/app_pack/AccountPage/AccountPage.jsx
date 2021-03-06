import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { Setup2faStep3Form, DeleteForm, ChangePasswordForm, ChangeEmailForm, CancelAccountForm } from './';
import { accountActions, globalActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';
import { I18n } from 'helpers';
import { ModalPopupForm } from '../_components/ModalPopupForm';
import { InfoBlock } from '../_components/admin';

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
    this.setup2faStep1 = this.setup2faStep1.bind(this);
    this.setup2faStep2 = this.setup2faStep2.bind(this);
    this.setup2faStep3 = this.setup2faStep3.bind(this);
    this.setup2faStep4 = this.setup2faStep4.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(globalActions.getEmailSubscriptions())
  }

  set2faStep(e, step) {
    e.preventDefault()
    this.props.dispatch(globalActions.setStep(step));

    switch (step) {
      case 0:
        // close modal popup
        this.props.dispatch(globalActions.setModalShow(false));
        break
      case 1:
        // help popup
        break
      case 2:
        // display qr code
        this.props.dispatch(accountActions.getQrCodeUrl());
        break
      case 3:
        // type 2fa otp code
        break
      case 4:
        // finish
        const data = FormDataAsJsonFromEvent(e)
        this.props.dispatch(accountActions.enable2FA(data))
        break
      default:
        this.props.dispatch(globalActions.setStep(0));
        this.props.dispatch(globalActions.setModalShow(false));
    }
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

  clearModalAlerts(e) {
    if (e) e.preventDefault();
    this.props.dispatch(globalActions.setModalShow(false));
    this.props.dispatch(accountActions.clearAlerts());
  }

  allowPasswordReset(e) {
    this.setState({ isAllowPasswordReset: e.target.checked });
    // this.props.dispatch(accountActions.allowPasswordReset(e.target.checked)); //todo:
  }

  enable2FA(e) {
    e.preventDefault();
    this.setState({ is2faEnabled: e.target.checked });
    if (e.target.checked)
      this.setup2faStep1(e);
    else
      this.disable2FA(e);
  }

  disable2FA(e) {
    e.preventDefault();
    this.props.dispatch(accountActions.disable2FA());
  }

  setup2faStep1(e) {
    if (e) e.preventDefault();
    this.props.dispatch(globalActions.setStep(1));
    this.props.dispatch(globalActions.setModalShow('setup2faStep1'));
  }

  setup2faStep2(e) {
    // display qr code
    e.preventDefault();
    this.props.dispatch(accountActions.getQrCodeUrl());
    this.props.dispatch(globalActions.setModalShow('setup2faStep2'));
  }

  setup2faStep3(e) {
    e.preventDefault();
    // type 2fa otp code
    this.props.dispatch(globalActions.setModalShow('setup2faStep3'));
  }

  setup2faStep4(e) {
    e.preventDefault()
    // sent password and 2fa code to remote api
    const data = FormDataAsJsonFromEvent(e);
    this.props.dispatch(accountActions.enable2FA(data));
  }

  changeEmailSubscription(e, id) {
    e.preventDefault();
    let ids = []
    if (e.target.checked) {
      // add to ids
      ids = [...this.props.user.email_subscription_ids, id]
    } else {
      // remove from ids
      ids = this.props.user.email_subscription_ids.filter(item => item !== id)
    }
    this.props.dispatch(accountActions.setEmailSubscriptionIds(ids));
  }

  isEmailSubscriptionChecked(item) {
    return this.props.user && this.props.user.email_subscription_ids && this.props.user.email_subscription_ids.length > 0 && this.props.user.email_subscription_ids.includes(item.id);
  }

  render() {
    const { email_subscriptions, loggingIn, user, qr_code_url, step } = this.props;
    return (
      <div className="container-fluid account">
        <div className="row">
          <div className="col-lg-7">

            <div className="mb-60">
              <h1>Username</h1>
              <div className="row align-items-center">
                <div className="col-sm-5">
                  <label className="col-form-label">Email</label>
                </div>
                <div className="col">
                  <input type="text" name="email_username" id="email_username" className="form-control" value={user && user.email} readOnly={true} placeholder='Email' />
                </div>
              </div>

              <div className="row align-items-center mt-10">
                <div className="col-sm-5">
                  <label className="col-form-label">Current plan</label>
                </div>
                <div className="col">
                  <div className="d-flex align-items-center">
                    <p className="m-0 text-blue">
                      {(user && user.tariff_plan && user.tariff_plan.title) || 'Free '}
                    </p>
                    <ModalPopupForm id='cancelAccountModal' aClasses={'ml-auto text-black'} aId='cancel_account_link' aUrl="#" aTitle={I18n.t('pages.account.cancel.title')} title={I18n.t('pages.account.cancel.title')} aText={I18n.t('pages.account.cancel.button')}
                      onBtnSave={this.onCancelAccount}
                      onClose={this.clearModalAlerts}
                      isForm={true}
                    >
                      <CancelAccountForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onCancelAccount} />
                    </ModalPopupForm>
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
                  <ModalPopupForm onClose={this.clearModalAlerts} id='changePasswordModal' isForm={true} title={I18n.t('pages.account.change_password.title')} btnClasses={'btn-block'} btnText={I18n.t('pages.account.change_password.button')}>
                    <ChangePasswordForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onChangePassword} />
                  </ModalPopupForm>
                </div>
              </div>
            </div>

            <div className="mb-60">
              <h1 id="password">Two-factor authentication</h1>

              <div className="row align-items-center">
                <div className="col-sm-5">
                  <label className="col-form-label">Two-factor authentication</label>
                </div>
                <div className="col">
                  <div className="mt-n1 custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch2fa"
                      onChange={this.enable2FA}
                      checked={user && user.is2fa}
                    />
                    <label className="custom-control-label" htmlFor="customSwitch2fa"></label>
                  </div>
                </div>
              </div>

              <ModalPopupForm onClose={this.clearModalAlerts}
                id='setup2faStep1'
                isForm={step >= 3 ? true : false}
                isHideBtn={true}
                onBtnSave={(e) => this.set2faStep(e, step + 1)}
                title='Set up two-factor authentication'
                btnCloseText={I18n.t('buttons.cancel')}
                btnSaveText={I18n.t('buttons.next')}
                btnClasses={''}>
                {step === 1 && <React.Fragment>
                  <p className="mt-0 mb-2">This wizard will enable Two Factor Authentication (2FA) on your Vega account. 2FA will make your Vega account more secure so we recommend enabling it.</p>
                  <InfoBlock>
                    <p className="mt-0 mb-2">
                      If you have never used 2FA before, we strongly recommend you &nbsp;
                    <Link to="#" className="mt-1 text-blue">reading our 2FA Guide first.</Link>
                    </p>
                  </InfoBlock>
                </React.Fragment>
                }
                {step === 2 && <React.Fragment>
                  <InfoBlock>
                    <p className="mt-0 mb-2">
                      Scan this code with your two-factor authentication device to set up your account.&nbsp;
                    <Link to="#" className="mt-1 text-blue">Enter key manually instead.</Link>
                    </p>
                  </InfoBlock>
                  <div className="text-center">
                    <img src={qr_code_url} className="img-fluid w-45" />
                  </div>
                </React.Fragment>
                }

                {step >= 3 && <React.Fragment>
                  <Setup2faStep3Form onModalCancel={(e) => this.set2faStep(e, step - 1)} onFormSubmit={(e) => this.set2faStep(e, step + 1)} />
                </React.Fragment>
                }

              </ModalPopupForm>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="mb-60">
              <h1 id="password">Recovery & notification</h1>
              <InfoBlock>
                <p>
                  The selected method can be used to recover an account in the event your forget your password and to be notified about missed emails.
                </p>
              </InfoBlock>

              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between">
                <div className="w-sm-35 mb-3 mb-sm-0">
                  <label className="col-form-label">Login email address</label>
                </div>
                <div className="mb-3 mb-sm-auto flex-grow-1 mr-sm-3 mr-md-5">
                  <input id="email_recovery" name="email_recovery" type="string" className="form-control" value={user && user.email} readOnly placeholder='Email' />
                </div>
                <div className="mb-3 mb-sm-auto">
                  <ModalPopupForm onClose={this.clearModalAlerts} id='changeEmailModal' isForm={true}
                    title='Change login email' btnText={I18n.t('buttons.edit')} btnClasses={'px-3'}>
                    <ChangeEmailForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onChangeEmail} />
                  </ModalPopupForm>
                </div>
              </div>

              {/*
              <div className="row mt-2">
                <div className="col-sm-5 align-self-center">
                  <label className="col-form-label">Allow password reset</label>
                </div>

                <div className="col">
                  <div className="mt-n1 custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitchAllowPwdReset" onChange={this.allowPasswordReset} disabled={false} checked={this.state.isAllowPasswordReset} />
                    <label className="custom-control-label" htmlFor="customSwitchAllowPwdReset"></label>
                  </div>
                </div>
              </div>
              */}
            </div>

            <div className="mb-60 email_subscriptions">
              <h1 id="delete">Email subscriptions</h1>
              <InfoBlock>
                <p>
                  To keep up with the latest development at Vega products, you can subscribe to our various emails and visit our blog from time to time.
                </p>
              </InfoBlock>

              <form className="">
                {email_subscriptions && email_subscriptions.length > 0 && email_subscriptions.map((item, index) =>
                  <div className="mt-10 row align-items-center" key={`email_subscriptions${index}`}>
                    <div className="col-auto">
                      <div className="round">
                        <input type="checkbox" id={`email_subscriptions${index}`}
                          onChange={(e) => this.changeEmailSubscription(e, item.id)}
                          checked={this.isEmailSubscriptionChecked(item)}
                        />
                        <label htmlFor={`email_subscriptions${index}`}></label>
                      </div>
                    </div>
                    <div className="col">
                      {item.title}
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="mb-60">
              <h1 id="delete">Delete Account</h1>
              <InfoBlock>
                <p>
                  Deleting your account will permanently delete all data associated with it and cannot be recovered. You will no longe be able to use the same email.
                </p>
              </InfoBlock>
              <ModalPopupForm onClose={this.clearModalAlerts} isForm={true} onBtnSave={this.onAccountDelete}
                id='deleteAccountModal' title='Delete account' btnText={I18n.t('pages.account.delete.button')}
                btnClasses={'w-xs-100 w-sm-45'} btnCloseText={I18n.t('buttons.cancel')} btnSaveText={I18n.t('buttons.delete')}>
                <DeleteForm onModalClose={this.clearModalAlerts} onFormSubmit={this.onAccountDelete} />
              </ModalPopupForm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { step, email_subscriptions, email_subscription_ids } = state.global;
  const { qr_code_url } = state.account;
  const { loggingIn, user } = state.authentication;
  return {
    loggingIn, user, qr_code_url, step,
    email_subscriptions, email_subscription_ids,
  };
}

AccountPage.defaultProps = {
  isAllowPasswordReset: true,
  is2faEnabled: false
}

const connectedPage = connect(mapStateToProps)(AccountPage);
export { connectedPage as AccountPage }; 