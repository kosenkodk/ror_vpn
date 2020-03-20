import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { globalActions } from '../_actions';
import { I18n } from 'helpers';
// import FlashMessages from '../_sections/FlashMessages';
import imgCloseSrc from 'images/admin/ic_close';
import iconTrash from 'images/icons/ic_trash.svg';

import Modal from 'react-bootstrap/Modal';
// import ModalDialog from 'react-bootstrap/ModalDialog';
import Button from 'react-bootstrap/Button';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
// import Alert from 'react-bootstrap/Alert';
import { TouchButton } from '../_components/admin';

class ModalPopupForm extends React.Component {
  constructor(props) {
    super(props);
    this.setModalShow = this.setModalShow.bind(this);
    this.Hide = this.Hide.bind(this);
    this.Show = this.Show.bind(this);
    this.onBtnSave = this.onBtnSave.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
  }

  setModalShow(isModalShow) {
    this.props.dispatch(globalActions.setModalShow(isModalShow));
  }

  Hide(e) {
    this.props.onClose(e);
    this.props.dispatch(globalActions.setModalShow(false));
    // this.props.dispatch(globalActions.setModalShow(null));
  }

  Show(e) {
    // this.props.dispatch(globalActions.setModalShow(true));
    this.props.dispatch(globalActions.setModalShow(this.props.id))
  }

  onBtnSave(e) {
    this.props.onBtnSave(e);
  }

  deleteAttachment(e) {
    e.preventDefault()
    this.props.dispatch(globalActions.deleteAttachment(this.props.item.id))
  }

  render() {
    const { isAllowPreviewDeletion, item, isHideBtn, loggedIn, error, notice, loading, id, title, btnText, btnCloseText, btnSaveText, aId, aClasses, aImgSrc, aImgClasses, aUrl, aTitle } = this.props;
    let link = <React.Fragment>
      {
        (aUrl && aImgSrc) ?
          <a href="#" id={aId} className={`${this.props.aClasses}`} data-toggle="modal">
            <div className="preview-container" ng-repeat="file in imagefinaldata">
              <img src={aImgSrc} className={aImgClasses} onClick={this.Show} />
              {isAllowPreviewDeletion && <img className="preview-delete" src={iconTrash} onClick={this.deleteAttachment} />}
            </div>
          </a>
          :
          <a href="#" id={aId} className={`${this.props.aClasses}`} data-toggle="modal" onClick={this.Show}>
            {aTitle}
          </a>
      }
    </React.Fragment>

    return (
      <React.Fragment>
        {!isHideBtn &&
          <React.Fragment>
            {
              aUrl ?
                link
                :
                <Button type="button" className={`btn btn-pink ${this.props.btnClasses}`} variant="primary"
                  onClick={this.Show}
                >
                  {btnText}
                </Button>
            }
          </React.Fragment>
        }
        <Modal
          // show={this.state.isModalShow}
          show={this.props.isModalShow === this.props.id}
          onHide={this.Hide}
          size="lg"
          aria-labelledby={`${id}Title`}
          centered
          className={`${loggedIn && 'admin_layout'}`}
        // dialogAs={ModalDialog}
        // dialogClassName="p-0"
        >
          <Modal.Header
            // closeButton 
            className="align-items-center">
            {/* <Modal.Title id={`${id}Title`}> */}
            <h1 className="modal-title" id={`${id}Title`}>{title}</h1>
            <button type="button"
              // onClick={this.props.onClose} 
              onClick={this.Hide}
              className="close" data-dismiss="modal" aria-label="Close">
              <img src={imgCloseSrc} className="img-fluid" />
            </button>
            {/* </Modal.Title> */}
          </Modal.Header>

          {this.props.isForm ?
            this.props.children :
            <div>
              <Modal.Body className="">
                {/* <FlashMessages error={error && error} notice={notice && notice} /> */}
                {this.props.children}
              </Modal.Body>

              {this.props.isShowFooter &&
                <Modal.Footer className="pt-0">
                  {this.props.isNextBtnOnly ?
                    <div className="d-flex w-100 justify-content-center">
                      {/* <button type="submit"
                        onClick={this.onBtnSave}
                        className="btn btn-pink active btn-next-only" disabled={loading ? true : false}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {' ' + btnSaveText}
                      </button> */}
                      <TouchButton clickWait={2000} className="btn btn-pink active btn-next-only"
                        onClick={this.onBtnSave}
                        value={' ' + btnSaveText}
                      />
                    </div>
                    :
                    <div className="d-flex w-100">
                      <button type="button"
                        onClick={this.Hide}
                        className="mr-auto btn btn-outline-danger" data-dismiss="modal">
                        {btnCloseText}
                      </button>
                      <TouchButton clickWait={2000} className="btn btn-pink active"
                        onClick={this.onBtnSave}
                        value={' ' + btnSaveText}
                      />
                      {/* <button type="submit"
                        onClick={this.onBtnSave}
                        className="btn btn-pink active" disabled={loading ? true : false}>
                        {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        {' ' + btnSaveText}
                      </button> */}
                    </div>
                  }
                </Modal.Footer>
              }
            </div>
          }
        </Modal>
      </React.Fragment>
    );
  }
}

ModalPopupForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  btnText: PropTypes.string,
  isForm: PropTypes.bool,
  aUrl: PropTypes.string,
  aTitle: PropTypes.string,
  isHideFooter: PropTypes.bool
}

ModalPopupForm.defaultProps = {
  id: 'modalId',
  title: 'Title',
  btnText: 'open modal popup',
  isForm: false,
  btnSaveText: I18n.t('buttons.save'),
  btnCloseText: I18n.t('buttons.close'),
  btnClasses: '',
  isShowFooter: true,
  isModalShow: false,
  // aUrl: '#',
  // aTitle: ''
}

function mapStateToProps(state) {
  const { isModalShow } = state.global;
  const { loggedIn } = state.authentication;
  const { error, notice, loading } = state.account;
  return { loading, error, notice, loggedIn, isModalShow }
}

const connectedPage = connect(mapStateToProps)(ModalPopupForm);
export { connectedPage as ModalPopupForm }; 