import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';
import imgCloseSrc from 'images/admin/ic_close';

import Modal from 'react-bootstrap/Modal';
// import ModalDialog from 'react-bootstrap/ModalDialog';
import Button from 'react-bootstrap/Button';
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
// import Alert from 'react-bootstrap/Alert';

class ModalPopupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShow: false
    };
    this.setModalShow = this.setModalShow.bind(this);
    this.Hide = this.Hide.bind(this);
    this.Show = this.Show.bind(this);
    this.onBtnSave = this.onBtnSave.bind(this);
  }

  setModalShow(isModalShow) {
    this.setState({ isModalShow: isModalShow });
  }

  Hide(e) {
    this.setState({ isModalShow: false });
    // this.props.onClose(e);
  }

  Show(e) {
    this.setState({ isModalShow: true });
  }

  onBtnSave(e) {
    // todo: hide modal popup on success response
    if (this.props.notice)
      this.setState({ isModalShow: false });
    this.props.onBtnSave(e);
  }

  render() {
    const { loggedIn, error, notice, loading, id, title, btnText, btnCloseText, btnSaveText, aId, aClasses, aImgSrc, aImgClasses, aUrl, aTitle } = this.props;
    return (
      <React.Fragment>
        {aUrl ?
          <a href="#" id={aId} className={`${this.props.aClasses}`} data-toggle="modal"
            // onClick={() => this.setModalShow(true)}
            onClick={this.Show}
          >
            {aImgSrc ? <img src={aImgSrc} className={aImgClasses} /> : aTitle}
          </a>
          :
          <Button type="button" className={`btn btn-pink ${this.props.btnClasses}`} variant="primary"
            // onClick={() => this.setModalShow(true)}
            onClick={this.Show}
          >
            {btnText}
          </Button>
        }

        <Modal
          show={this.state.isModalShow}
          // onHide={() => this.setModalShow(false)}
          onHide={this.Hide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className={`${loggedIn && 'admin_layout'}`}
        // dialogAs={ModalDialog}
        // dialogClassName="p-0"
        >
          <Modal.Header
            // closeButton 
            className="align-items-center">
            {/* <Modal.Title id="contained-modal-title-vcenter"> */}
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
                <FlashMessages error={error && error} notice={notice && notice} />
                {this.props.children}
              </Modal.Body>

              {this.props.isShowFooter &&
                <Modal.Footer className="pt-0">
                  <div className="d-flex w-100">
                    <button type="button"
                      // onClick={this.props.onClose}
                      // onClick={() => this.setModalShow(false)}
                      onClick={this.Hide}
                      className="mr-auto btn btn-outline-danger" data-dismiss="modal">{btnCloseText}</button>
                    <button type="submit"
                      onClick={this.onBtnSave}
                      className="btn btn-pink active" disabled={loading ? true : false}>
                      {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                      {' ' + btnSaveText}
                    </button>
                  </div>
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
  // aUrl: '#',
  // aTitle: ''
}

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  const { error, notice, loading } = state.account
  return { loading, error, notice, loggedIn }
}

const connectedPage = connect(mapStateToProps)(ModalPopupForm);
export { connectedPage as ModalPopupForm }; 