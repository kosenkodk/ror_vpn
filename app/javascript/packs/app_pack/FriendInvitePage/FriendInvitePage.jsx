import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, globalActions, alertActions } from '../_actions';
import { I18n } from 'helpers';
import friendInviteSrc from 'images/admin/friend_invite.svg';
// import gmailSrc from 'images/icons/ic_gmail.svg';
import icTwitter from 'images/icons/ic_twitter.svg';
import icFacebook from 'images/icons/ic_facebook.svg';
import icTelegram from 'images/icons/ic_telegram.svg';

class FriendInvitePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emails: '',
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
    const cyrillicPattern = /^[\u0400-\u04FF]+$/;
    const { name, value } = e.target;
    if (!cyrillicPattern.test(value))
      this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { emails } = this.state;
    if (emails) {
      this.props.dispatch(userActions.refer_friend(emails));
    } else {
      this.props.dispatch(alertActions.error(I18n.t('api.errors.email_blank')))
    }
  }

  componentDidMount() {
    this.props.dispatch(globalActions.getReferLink())
  }

  render() {
    const { refer_link, loggingIn, loading } = this.props;
    const { emails } = this.state;
    return (
      <div className="container-fluid pt-0 pb-0">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 friend-invite">
            <h1>Refer Friends</h1>

            <div className="mt-sm-4 d-flex flex-column flex-sm-row align-items-center">
              <div className="w-sm-37 pr-4">
                <img className="img-fluid w-100" src={friendInviteSrc} alt="Generic placeholder image" />
              </div>
              <div className="w-sm-63">
                <h6 className="mt-lg-n4 mb-4">Spread the word and earn rewards</h6>
                <p className="mb-3">
                  When someone signs up with your unqique referral link, both you and the referred user will receive $10 worth of Blockport Tokens after they have traded $100 or more.
                </p>
                <Link to="#" className="text-blue">Terms and conditions apply.</Link>
              </div>
            </div>

            {/* send invites */}
            <div className="mt-88">
              <form name="form" onSubmit={this.handleSubmit}>

                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                  <div className="w-sm-37">
                    <label className="col-form-label">
                      Email address (-es)
                    </label>
                  </div>
                  <div className="w-sm-37 w-md-45 pr-sm-3">
                    <input type="string" name="emails" className="form-control" id="emails"
                      value={emails} onChange={this.handleChange} placeholder='friend@email.com,friend2@email.com'
                    />
                  </div>

                  <div className="flex-grow-1">
                    <button type="submit" className="btn btn-pink btn-block btn-copy px-2 mt-2 mt-sm-auto"
                      disabled={loading ? true : false}
                    >
                      {/* {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} */}
                      {' ' + I18n.t('buttons.send_invites')}
                    </button>
                  </div>
                </div>

                {/* import gmail contacts */}
                {/* <div className="import_email_contacts d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                  <div className="w-37"></div>
                  <div className="flex-grow-1">
                    <p className="">
                      <small>
                        Import Contacts: <img src={gmailSrc} className="img-fluid p-2" /> Gmail
                      </small>
                    </p>
                  </div>
                </div> */}
              </form>
            </div>

            <div className="mt-3 mb-3 d-flex flex-row align-items-center justify-content-between">
              <div className="border-top w-43"></div> <b>or</b> <div className="w-43 border-top"></div>
            </div>

            {/* share refer link */}
            <div className="">
              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                <div className="w-sm-37">
                  <label className="col-form-label">
                    Share Your Link
                  </label>
                </div>
                <div className="w-sm-37 w-md-45 pr-sm-3">
                  <input type="string" name="refer_link" className="form-control" id="refer_link"
                    ref={(copyLinkRefer) => this.copyLinkRefer = copyLinkRefer}
                    defaultValue={refer_link} readOnly={true} placeholder=''
                  />
                </div>

                <div className="flex-grow-1">
                  <button type="submit" className="btn btn-pink btn-block btn-copy px-2 mt-2 mt-sm-auto"
                    onClick={this.copyToClipboard}
                  >
                    {' ' + I18n.t('buttons.copy')}
                  </button>
                </div>
              </div>

              {/* share refer link to soc nets */}
              <div className="share-links d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                <div className="w-37"></div>
                <div className="flex-grow-1">
                  <div className="d-flex flex-column flex-sm-row align-items-end flex-wrap flex-md-nowrap">
                    <a className="w-100 mr-md-3 mt-3"
                      href={`https://telegram.me/share/url?url=${refer_link}`} target="_blank">
                      <button className="btn btn-telegram btn-block px-2 ">
                        <img src={icTelegram} /> {I18n.t('buttons.telegram')}
                      </button>
                    </a>
                    <a className="w-100 mr-md-3 mt-3"
                      href={`https://www.facebook.com/sharer.php?u=${refer_link}`} target="_blank">
                      <button className="btn btn-facebook btn-block px-2 ">
                        <img src={icFacebook} /> {I18n.t('buttons.facebook')}
                      </button>
                    </a>
                    <a className="w-100 mt-3"
                      href={`https://twitter.com/intent/tweet?url=${refer_link}`} target="_blank">
                      <button className="btn btn-twitter px-2 btn-block">
                        <img src={icTwitter} /> {I18n.t('buttons.twitter')}
                      </button>
                    </a>
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
  const { refer_link } = state.global;
  const { loading } = state.users
  const { loggingIn } = state.authentication;
  return {
    refer_link,
    loggingIn, loading
  };
}

const connectedPage = connect(mapStateToProps)(FriendInvitePage);
export { connectedPage as FriendInvitePage }; 