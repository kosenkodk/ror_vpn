import React from 'react';
import { I18n } from 'helpers';
import ContactusForm from './ContactusForm';
// import FlashMessages from '../_sections/FlashMessages';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';
import imgMarsSrc from 'images/coming_soon/mars';

class ContactusPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      error: '',
      notice: '',
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(userActions.contactUs(FormDataAsJsonFromEvent(e)));
  }

  render() {
    return (
      <div className="contact_us row">
        <div className="col">
          <div className="row text-left bg_astronaut_with_cometa" style={{ minHeight: this.props.height }}>
            <div className="offset-sm-3 col-sm-9 align-self-end">
              <h1 className="mb-3">
                {I18n.t('pages.contact_us.title')}
              </h1>
              <p className="lead mb-md-5 pb-md-4">{I18n.t('pages.contact_us.subtitle')}</p>
            </div>

            {/* <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-8 text-center">
                <FlashMessages error={this.state.error} notice={this.state.notice} />
              </div>
            </div>
             */}
            <ContactusForm handleFormSubmit={this.handleFormSubmit} departments={this.props.departments && this.props.departments} />
          </div>

          <div className="col-md-12 align-self-end">
            <img src={imgMarsSrc} className="img-fluid" />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { height } = state.page;
  const { departments } = state.global;
  return { departments, height };
}

const connectedApp = connect(mapStateToProps)(ContactusPage);
export { connectedApp as ContactusPage };