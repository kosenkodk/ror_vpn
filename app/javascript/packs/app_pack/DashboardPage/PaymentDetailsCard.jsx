import React from 'react';
import { NavHashLink as Link } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'helpers';
import { InfoBlock } from '../_components/admin';

class PaymentDetailsCard extends React.Component {

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
      <form onSubmit={this.props.onFormSubmit} className="account-delete-form">
        <div className="modal-body">

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {/* {I18n.t('pages.tickets.form.text')} */}
              Amount due
              </label>
            <div className="col-sm-6">
              <input type="text" id="message" name="message" className="form-control" defaultValue={this.props.text || ''} required={false} placeholder={I18n.t('pages.tickets.form.help.text')} />
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label" htmlFor="email_contact">
              Payment method
              {/* {I18n.t('pages.tickets.form.title')} */}
            </label>
            <div className="col-sm-6">
              <select
              // className={`${this.props.className ? this.props.className : 'form-control'}`} id="departmentSelectBox" name="department" value={this.state.departmentSelectValue} onChange={this.onDepartmentSelectChange}
              >
                {this.props.departments && this.props.departments.map((item) =>
                  <option key={`department${item.id}`} value={item.id}>{item.title}</option>
                )}
              </select>
              {/* <input type="hidden" name="id" value={this.props.id && this.props.id} />
              <input type="text" name="email_contact" required={false} className="form-control" defaultValue={email} placeholder='Email' onChange={this.handleChange} aria-describedby="email_contact" />
              <p className="form-text">Please provide an email address in case we need to contact you.</p> */}
            </div>
            <div className="col-sm-2"></div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
            </label>
            <div className="col-sm-6">
              <textarea readOnly type="text" id="cancel_account_reason_text" name="cancel_account_reason_text" className="form-control" defaultValue={this.props.text || ''} required={false}
              // placeholder={I18n.t('pages.account.cancel.form.message')}
              ></textarea>
            </div>
            <div className="col-sm-2"></div>
          </div>

        </div>
        <div className="modal-footer">
          <div className="d-flex w-100 justify-content-center">
            {/* <button type="button" onClick={this.props.onModalClose} className="mr-auto btn btn-outline-danger" data-dismiss="modal">{I18n.t('buttons.cancel')}</button> */}
            <button type="submit" className="btn btn-pink" disabled={loading ? true : false}>
              {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
              {' ' + I18n.t('buttons.next')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

PaymentDetailsCard.propTypes = {
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

const connectedForm = connect(mapStateToProps)(PaymentDetailsCard);
export { connectedForm as PaymentDetailsCard }; 