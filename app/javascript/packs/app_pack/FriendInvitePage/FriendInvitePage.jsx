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
      invite_link: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, invite_link } = this.state;
    const { dispatch } = this.props;
    if (email && invite_link) {
      // dispatch(userActions.invites_send(email, invite_link));
    }
  }

  render() {
    const { loggingIn, loading } = this.props;
    const { email, invite_link, submitted } = this.state;
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

            {/* flex + mobiles */}
            <div className="mb-60 mt-88">
              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                <div className="w-sm-37">
                  <label className="col-form-label">
                    Email address
                  </label>
                </div>
                <div className="flex-grow-1 pr-sm-2">
                  <input type="string" name="email" className="form-control" id="email"
                  // value={email} onChange={this.handleChange} placeholder='Email'
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

            </div>

            {/* share link */}
            <div className="mb-60 mt-88">
              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
                <div className="w-sm-37">
                  <label className="col-form-label">
                    Share Your Link
                  </label>
                </div>
                <div className="flex-grow-1 pr-sm-2">
                  <input type="string" name="email" className="form-control" id="email"
                  // value={email} onChange={this.handleChange} placeholder='Email'
                  />
                </div>

                <div className="flex-shrink-0">
                  <button type="submit" className="btn btn-pink btn-block btn-copy px-2 mt-2 mt-sm-auto"
                    disabled={loading ? true : false}
                  >
                    {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    {' ' + I18n.t('buttons.copy')}
                  </button>
                </div>
              </div>

              {/* share link to soc nets */}
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

            <form name="form" onSubmit={this.handleSubmit}>
              <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                {submitted && !email &&
                  <div className="help-block">email is required</div>
                }
              </div>
              {/* <div className={'form-group' + (submitted && !invite_link ? ' has-error' : '')}>
            <label htmlFor="invite_link">Share Your Link</label>
            <input type="text" className="form-control" name="invite_link" value={invite_link} onChange={this.handleChange} />
            {submitted && !invite_link &&
              <div className="help-block">Invite link is required</div>
            }
          </div> */}
              <div className="form-group">
                <button className="btn btn-primary">
                  {I18n.t('buttons.send_invites')}
                </button>
                {loggingIn &&
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
              </div>
            </form>
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