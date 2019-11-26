import React from 'react';
import { I18n } from 'helpers';
import ContactusForm from './ContactusForm';
import FlashMessages from '../_sections/FlashMessages';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { FormDataAsJsonFromEvent } from '../_helpers';
// import imgAstronautSrc from 'images/coming_soon/astronaut';
// import marsWithSpaceshipImage from 'images/coming_soon/mars_with_spaceship';
import imgMarsSrc from 'images/coming_soon/mars';
// import imgCompareSrc from 'images/compare/contactusForm';

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

          {/* <div className="row">
            <img src={imgCompareSrc} className="col img-fluid" />
          </div> */}

          <div className="row text-left bg_astronaut" style={{ minHeight: this.props.height }}>
            <div className="offset-xl-3 col-xl-9 align-self-end">
              <h1 className="mb-3">
                {I18n.t('pages.contact_us.title')}
              </h1>
              <p className="lead mb-5 pb-4">{I18n.t('pages.contact_us.subtitle')}</p>
            </div>

            {/* <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-8 text-center">
                <FlashMessages error={this.state.error} notice={this.state.notice} />
              </div>
            </div>
             */}
            <ContactusForm handleFormSubmit={this.handleFormSubmit} departments={this.props && this.props.items} />
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
  const { loading, items } = state.departments;
  return { loading, items, height };
}

const connectedApp = connect(mapStateToProps)(ContactusPage);
export { connectedApp as ContactusPage };