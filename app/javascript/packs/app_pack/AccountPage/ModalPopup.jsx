import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';
import imgCloseSrc from 'images/admin/ic_close';

class ModalPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggedIn, error, notice, loading, id, title, btnText, btnCloseText, btnSaveText } = this.props;
    return (
      <React.Fragment>
        <button type="button" className={`btn btn-pink ${this.props.btnClasses}`} data-toggle="modal" data-target={`#${id}`}>
          {btnText}
        </button>
        <div className={`modal fade ${loggedIn && 'admin_layout'}`} onToggle={this.onToggle} data-backdrop={true} id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Title`} aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header align-items-center">
                <h1 className="modal-title" id={`${id}Title`}>{title}</h1>
                <button type="button" onClick={this.props.onClose} className="close" data-dismiss="modal" aria-label="Close">
                  {/* <span aria-hidden="true">&times;</span> */}
                  <img src={imgCloseSrc} className="img-fluid" />
                </button>
              </div>
              {this.props.isForm ?
                this.props.children :
                <div>
                  <div className="modal-body">
                    <FlashMessages error={error && error} notice={notice && notice} />
                    {this.props.children}
                  </div>
                  <div className="modal-footer">
                    <div className="d-flex w-100">
                      <button type="button" onClick={this.props.onClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{btnCloseText}</button>
                      <button type="submit" onClick={this.props.onBtnSave} className="btn btn-pink active" disabled={loading ? true : false}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {/* <button type="submit" onClick={this.props.onSave} className="btn btn-outline-pink active"> */}
                        {' ' + btnSaveText}
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ModalPopup.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  btnText: PropTypes.string,
  isForm: PropTypes.bool,
}

ModalPopup.defaultProps = {
  id: 'modalId',
  title: 'Title',
  btnText: 'open modal popup',
  isForm: false,
  btnSaveText: I18n.t('buttons.save'),
  btnCloseText: I18n.t('buttons.close'),
  btnClasses: ''
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  const { error, notice, loading } = state.account
  return { loading, error, notice, loggedIn }
}

const connectedPage = connect(mapStateToProps)(ModalPopup);
export { connectedPage as ModalPopup }; 