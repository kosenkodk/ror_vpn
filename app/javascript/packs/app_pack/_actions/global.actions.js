
import { userService } from '../_services';
import { alertActions } from './';
import { globalConstants } from '../_constants';

export const globalActions = {
  getDepartments,
  getAccountCancellationReasons,
  setModalShow,
  setAttachments,
  clearAttachments,
  deleteAttachment,
}

function setAttachments(files) {
  if (files && files.length > 0) {
    // const promises = [...files].map(async (item) => await this.prepareAttachmentForJsonApi(item));
    // const attachmentsForApi = await Promise.all(promises)

    const imagePreviews = [...files].map((item, index) => {
      return { file: item, url: URL.createObjectURL(item) };
    });
    return { type: globalConstants.SET_ATTACHMENTS, attachments: { files: files, previews: imagePreviews } };
  }
  // return { type: globalConstants.SET_ATTACHMENTS, attachments: { files: [], previews: [] } };
  return dispatch(clearAttachments())
}

function clearAttachments() {
  return { type: globalConstants.CLEAR_ATTACHMENTS };
}

function deleteAttachment(index) {
  return { type: globalConstants.DELETE_ATTACHMENT, index: index };
}

function setModalShow(isModalShow) {
  return dispatch => {
    dispatch(setModalShow(isModalShow))
  }
  function setModalShow(isModalShow) { return { type: globalConstants.IS_MODAL_SHOW, isModalShow } }
}

function getDepartments() {
  return dispatch => {
    // dispatch(request())
    userService.getDepartments()
      .then(
        items => dispatch(success(items)),
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  // function request() { return { type: globalConstants.GET_DEPARTMENTS_REQUEST } }
  function success(departments) { return { type: globalConstants.GET_DEPARTMENTS_SUCCESS, departments } }
  // function failure(error) { return { type: globalConstants.GET_DEPARTMENTS_FAILURE, error } }
}


function getAccountCancellationReasons() {
  return dispatch => {
    // dispatch(request())
    userService.getAccountCancellationReasons()
      .then(
        items => dispatch(success(items)),
        error => {
          // dispatch(failure(error))
          dispatch(alertActions.error(error))
        }
      )
  }

  // function request() { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_REQUEST } }
  function success(account_cancellation_reasons) { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_SUCCESS, account_cancellation_reasons } }
  // function failure(error) { return { type: globalConstants.GET_ACCOUNT_CANCELLATION_REASONS_FAILURE, error } }
}
