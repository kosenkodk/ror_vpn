import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormDataAsJsonFromEvent } from '../_helpers';
import { I18n } from 'helpers';
import { userActions } from '../_actions';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password_old: '',
      password: '',
      password_confirmation: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  onChangeLoginPassword(e) {
    const data = FormDataAsJsonFromEvent(e);
    console.log('onChangeLoginPassword()', data, e.target);
    // userActions.changeLoginPasword(data);
    e.preventDefault();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { passwordOld, password, password_confirmation } = this.state;
    const { loggingIn, idModal } = this.props;
    return (
      <React.Fragment>
        <h4 id="password">Passwords</h4>
        <div className="row">
          <div className="col-sm-6 align-self-center">
            <label className="col-form-label">Login password</label>
          </div>
          <div className="col-sm-6">
            <button type="button" className={`btn btn-outline-pink active`} data-toggle="modal" data-target={`#${idModal}`}>
              Change login password
            </button>
          </div>
        </div>

        <div className="modal fade" data-backdrop={true} id={idModal} tabIndex="-1" role="dialog" aria-labelledby={`${idModal}Title`} aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${idModal}Title`}>{this.props.title || 'Change login password'}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.onChangeLoginPassword}>
                <div className="modal-body">
                  <div className="col">
                    <div className="form-group row">
                      <label htmlFor="password_old" className="col-sm-6 col-form-label">Old login password:</label>
                      <input type="password" name="password_old" className="col-sm-6 form-control" id="password_old" value={password_old} onChange={this.handleChange} placeholder='Password' />
                    </div>
                    <div className="form-group row">
                      <label htmlFor="password" className="col-sm-6 col-form-label">New login password:</label>
                      <input type="password" name="password" className="col-sm-6 form-control" id="password" value={password} onChange={this.handleChange} placeholder='Password' />
                    </div>
                    <div className="form-group row">
                      <label htmlFor="password_confirmation" className="col-sm-6 col-form-label">Confirm login password:</label>
                      <input type="password" name="password_confirmation" className="col-sm-6 form-control" id="password_confirmation" value={password_confirmation} onChange={this.handleChange} placeholder='Confirm' />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-pink-dark" data-dismiss="modal">{I18n.t('buttons.close')}</button>
                  <button type="submit" className="btn btn-outline-pink active">
                    {I18n.t('buttons.save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ChangePassword.propTypes = {
  idModal: PropTypes.string
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedPage = connect(mapStateToProps)(ChangePassword);
export { connectedPage as ChangePassword }; 