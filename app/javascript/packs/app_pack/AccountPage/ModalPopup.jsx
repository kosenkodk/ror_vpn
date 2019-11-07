import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';

class ModalPopup extends React.Component {

  render() {
    const { id, title, btnText, btnCloseText, btnSaveText } = this.props;
    return (
      <React.Fragment>
        <button type="button" className="btn btn-outline-pink active" data-toggle="modal" data-target={`#${id}`}>
          {btnText}
        </button>
        <div className="modal fade" data-backdrop={true} id={id} tabIndex="-1" role="dialog" aria-labelledby={`${id}Title`} aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${id}Title`}>{title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {this.props.isForm ?
                this.props.children :
                <div>
                  <div className="modal-body">
                    {this.props.children}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-pink-dark" data-dismiss="modal">{btnCloseText}</button>
                    <br />
                    <button type="submit" onClick={this.props.onSave} className="btn btn-outline-pink active">
                      {' ' + btnSaveText}
                    </button>
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
}

function mapStateToProps(state) {
  return state
}

const connectedPage = connect(mapStateToProps)(ModalPopup);
export { connectedPage as ModalPopup }; 