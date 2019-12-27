import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import FlashMessages from '../_sections/FlashMessages';

class DeleteForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '' }
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email } = this.state;
    const { loading, error, notice } = this.props;
    return (
      <form onSubmit={this.props.onFormSubmit}>
        <div className="modal-body">
          <FlashMessages error={error && error} notice={notice && notice} />
          {/* <div className="form-group row align-items-center">
            <label htmlFor="email" className="col-sm-4 col-form-label">Email login:</label>
            <input type="string" name="email" className="col-sm-6 form-control" id="email" value={email} onChange={this.handleChange} placeholder='Email' />
          </div> */}

          <div className="border-left-pink mt-0">
            <h6 id="caveat-with-anchors">WARNING: DELETION IS PERMANENT</h6>
            <p className="m-0">If you wish to delete this account in order to combine it with another one, do NOT delete it.
                  {/* <a>Learn more</a> */}
            </p>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {/* {I18n.t('pages.tickets.form.text')} */}
              Feedback
              </label>
            <div className="col-sm-6">
              <textarea type="text" name="text" className="form-control" defaultValue={this.props.text || ''} required={false} rows="6" placeholder={I18n.t('pages.tickets.form.help.text')}></textarea>
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              Email address
              {/* {I18n.t('pages.tickets.form.title')} */}
            </label>
            <div className="col-sm-6">
              <input type="hidden" name="id" value={this.props.id && this.props.id} />
              <input type="text" name="title" required={true} className="form-control" defaultValue={this.props.title} placeholder={I18n.t('pages.tickets.form.help.title')} />
              <p className="">Please provide an email address in case we need to contact you.</p>
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row align-items-center">
            <label htmlFor="password_old" className="col-sm-4 col-form-label">
              Login password</label>
            <div className="col-sm-6">
              <input type="password" name="password_old" className="form-control" id="password_old"
              // value={password_old} onChange={this.handleChange} placeholder='Password'
              />
            </div>
            <div className="col-sm-2"></div>
          </div>

        </div>
        <div className="modal-footer">
          <div className="d-flex w-100">
            <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button>
            <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {' ' + I18n.t('buttons.submit')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

DeleteForm.propTypes = {
  id: PropTypes.string,
  error: PropTypes.string,
  notice: PropTypes.string,
}

function mapStateToProps(state) {
  const { loading, error, notice } = state.account;
  return {
    loading,
    error,
    notice,
  };
}

const connectedForm = connect(mapStateToProps)(DeleteForm);
export { connectedForm as DeleteForm }; 