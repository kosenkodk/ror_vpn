import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { I18n } from 'helpers';
import friendInviteSrc from 'images/admin/friend_invite.svg';

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
    const { loggingIn } = this.props;
    const { email, invite_link, submitted } = this.state;
    return (
      <div className="col-md-8 col-md-offset-2 friend-invite">
        <h1>Refer Friends</h1>

        <div class="media">
          <img class="mr-4" src={friendInviteSrc} alt="Generic placeholder image" />
          <div class="media-body">
            <h6 class="mt-2 mb-4 pb-1">Spread the word and earn rewards</h6>
            <p className="mb-3">
              When someone sighs up with your unqique referral link, both you and the referred user will receive $10 worth of Blockport Tokens after they have traded $100 or more.
            </p>
            <a href="#" className="text-blue">Terms and conditions apply.</a>
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
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedPage = connect(mapStateToProps)(FriendInvitePage);
export { connectedPage as FriendInvitePage }; 