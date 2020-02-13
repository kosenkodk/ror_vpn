import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { I18n } from 'helpers';
import friendInviteSrc from 'images/admin/friend_invite.svg';
import gmailSrc from 'images/icons/ic_gmail.svg';
import icTwitter from 'images/icons/ic_twitter.svg';
import icFacebook from 'images/icons/ic_facebook.svg';
import icTelegram from 'images/icons/ic_telegram.svg';

class FriendInvitePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      link_refer: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  copyToClipboard = (e) => {
    this.copyLinkRefer.select();
    document.execCommand('copy');
    e.target.focus();
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, link_refer } = this.state;
    const { dispatch } = this.props;
    if (email && link_refer) {
      // dispatch(userActions.invites_send(email, link_refer));
    }
  }

  render() {
    const { loggingIn, loading } = this.props;
    const { email, link_refer, submitted } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 friend-invite">
            <h1>Refer Friends</h1>

            <div className="mt-sm-4 d-flex flex-column flex-sm-row align-items-center">
              <div className="w-sm-37 pr-2">
                <img className="img-fluid" src={friendInviteSrc} alt="Generic placeholder image" />
              </div>
              <div className="w-sm-63">
                <h6 className="mt-lg-n4 mb-4">Spread the word and earn rewards</h6>
                <p className="mb-3">
                  When someone signs up with your unqique referral link, both you and the referred user will receive $10 worth of Blockport Tokens after they have traded $100 or more.
                </p>
                <a href="#" className="text-blue">Terms and conditions apply.</a>
              </div>
            </div>

            {/* send invites */}
            <div className="mt-88">
              <form name="form" onSubmit={this.handleSubmit}>

                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                  <div className="w-sm-37">
                    <label className="col-form-label">
                      Email address
                  </label>
                  </div>
                  <div className="flex-grow-1 pr-sm-2">
                    <input type="string" name="email" className="form-control" id="email"
                      value={email} onChange={this.handleChange} placeholder='Email'
                    />
                  </div>

                  <div className="flex-shrink-0">
                    <button type="submit" className="btn btn-pink btn-block btn-copy px-2 mt-2 mt-sm-auto"
                      disabled={loading ? true : false}
                    >
                      {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                      {' ' + I18n.t('buttons.send_invites')}
                    </button>
                  </div>
                </div>

                {/* import gmail contacts */}
                <div className="import_email_contacts d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                  <div className="w-37"></div>
                  <div className="flex-grow-1">
                    <p className="">
                      <small>
                        Import Contacts: <img src={gmailSrc} className="img-fluid p-2" /> Gmail
                    </small>
                    </p>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-lg-n2 mb-lg-3 d-flex flex-row align-items-center justify-content-between">
              <div className="border-secondary border-top w-45"></div> <b>or</b> <div className="w-45 border-secondary border-top"></div>
            </div>

            {/* share refer link */}
            <div className="mb-60">
              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                <div className="w-sm-37">
                  <label className="col-form-label">
                    Share Your Link
                  </label>
                </div>
                <div className="flex-grow-1 pr-sm-2">
                  <input type="string" name="link_refer" className="form-control" id="link_refer"
                    ref={(copyLinkRefer) => this.copyLinkRefer = copyLinkRefer}
                    defaultValue={link_refer} readOnly={true} placeholder=''
                  />
                </div>

                <div className="flex-shrink-0">
                  <button type="submit" className="btn btn-pink btn-block btn-copy px-2 mt-2 mt-sm-auto"
                    onClick={this.copyToClipboard}
                    disabled={loading ? true : false}
                  >
                    {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    {' ' + I18n.t('buttons.copy')}
                  </button>
                </div>
              </div>

              {/* share refer link to soc nets */}
              <div className="share-links d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                <div className="w-37"></div>
                <div className="flex-grow-1">
                  <div className="mt-2 mt-md-0 d-flex flex-column flex-sm-row align-items-end flex-wrap flex-md-nowrap">
                    <button className="btn btn-telegram btn-block px-2 mr-md-2">
                      <img src={icTelegram} /> {I18n.t('buttons.telegram')}
                    </button>
                    <button className="btn btn-facebook btn-block px-2 mr-md-2">
                      <img src={icFacebook} /> {I18n.t('buttons.facebook')}
                    </button>
                    <button className="btn btn-twitter px-2 btn-block">
                      <img src={icTwitter} /> {I18n.t('buttons.twitter')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loading = false // todo:
  const { loggingIn } = state.authentication;
  return {
    loggingIn, loading
  };
}

const connectedPage = connect(mapStateToProps)(FriendInvitePage);
export { connectedPage as FriendInvitePage }; 