import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormDataAsJsonFromEvent } from '../_helpers';
import { I18n } from 'helpers';
import { accountActions } from '../_actions';
import FlashMessages from '../_sections/FlashMessages';

class ChangeEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    const data = FormDataAsJsonFromEvent(e);
    data['id'] = this.props.id;
    this.props.dispatch(accountActions.changeEmail(data));
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email } = this.state;
    const { loading, idModal, error, notice, user } = this.props;
    return (
      <div className="mb-5">
        <h4 id="email">Email</h4>
        <div className="row">
          <div className="col-sm-4 align-self-center">
            <label className="col-form-label">Login email address: {user && user.email}</label>
          </div>
          <div className="col-sm-8">
            <button type="button" className={`btn btn-outline-pink active`} data-toggle="modal" data-target={`#${idModal}`}>
              {I18n.t('pages.account.change_email.button')}
            </button>
          </div>
        </div>

        <div className="modal fade" data-backdrop={true} id={idModal} tabIndex="-1" role="dialog" aria-labelledby={`${idModal}Title`} aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${idModal}Title`}>{this.props.title || 'Change login email'}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.onFormSubmit}>
                <div className="modal-body">
                  <FlashMessages error={error && error} notice={notice && notice} />
                  <div className="col">
                    <div className="form-group row">
                      <label htmlFor="email" className="col-sm-6 col-form-label">Email login:</label>
                      <input type="string" name="email" className="col-sm-6 form-control" id="email" value={email} onChange={this.handleChange} placeholder='Email' />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-pink-dark" data-dismiss="modal">{I18n.t('buttons.close')}</button>

                  <button type="submit" className="btn btn-outline-pink active" disabled={loading ? true : false}>
                    {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                    {' ' + I18n.t('buttons.save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChangeEmail.propTypes = {
  idModal: PropTypes.string
}

ChangeEmail.defaultProps = {
  id: '',
  error: '',
  notice: '',
}

function mapStateToProps(state) {
  const { loading, error, notice } = state.account;
  const { loggingIn, user } = state.authentication;
  const { id } = user;
  return {
    loggingIn,
    id,
    user,
    loading,
    error,
    notice,
  };
}

const connectedPage = connect(mapStateToProps)(ChangeEmail);
export { connectedPage as ChangeEmail }; 