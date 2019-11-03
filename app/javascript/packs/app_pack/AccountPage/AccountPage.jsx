import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { I18n } from 'helpers'
import Plans from '../SignupPage/Plans';

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggingIn, idModalTitle, idModal } = this.props;
    return (
      <React.Fragment>
        <div className="shadow-vega bg-vega">
          <button type="button" className={`btn btn-sm ${this.props.isEdit ? 'btn-outline-warning' : 'btn-outline-info'}`} data-toggle="modal" data-target={`#${idModal}`}>
            {this.props.isEdit ? I18n.t('buttons.edit') : I18n.t('buttons.view')}
          </button>

          <div className="modal fade" data-backdrop={true} id={idModal} tabIndex="-1" role="dialog" aria-labelledby={idModalTitle} aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id={idModalTitle}>{this.props.title || 'Change login password'}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Do NOT forget this password. If you forget it, you will not be able to login or decrypt your messages.

Save your password somewhere safe. Click on the  icon to confirm you that have typed your password correctly.

We recommend adding a recovery email address first. Otherwise, you cannot recover your account if something goes wrong.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-pink-dark" data-dismiss="modal">{I18n.t('buttons.close')}</button>
                  {this.props.isEdit && <button type="button" className="btn btn-outline-pink active">
                    {I18n.t('buttons.save')}
                  </button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

AccountPage.defaultProps = {
  idModalTitle: 'modalTitle',
  idModal: 'modal'
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedPage = connect(mapStateToProps)(AccountPage);
export { connectedPage as AccountPage }; 