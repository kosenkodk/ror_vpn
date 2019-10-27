import React from 'react';
import { I18n } from 'helpers';
import marsWithSpaceshipImage from 'images/coming_soon/mars_with_spaceship';
import ContactusForm from './ContactusForm';
import FlashMessages from '../_sections/FlashMessages';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class ContactusPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      error: '',
      notice: '',
    }
  }

  handleFormSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    let data = {}
    formData.forEach((value, key) => { data[key] = value });
    this.props.dispatch(userActions.contactUs(data))
  }

  render() {
    return (
      <div className="contact_us mt-lg-5 pt-lg-5">
        <div className="featurette text-center bg_astronaut">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {/* <!-- <h1 className="featurette-heading">
                <%= t('pages.contact_us.title') %>
        </h1> --> */}
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-8 text-left">
                  <h1 className="featurette-heading mb-0 pb-2">
                    {I18n.t('pages.contact_us.title')}
                  </h1>
                  <p className="lead">{I18n.t('pages.contact_us.subtitle')}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-8 text-center">
                    <FlashMessages error={this.state.error} notice={this.state.notice} />
                  </div>
                </div>
                <ContactusForm handleFormSubmit={this.handleFormSubmit} departments={this.props && this.props.items} />
              </div>
            </div>
            <div className="col-md-12">
              <img src={marsWithSpaceshipImage} className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loading, items } = state.departments;
  return { loading, items }
}

const connectedApp = connect(mapStateToProps)(ContactusPage);
export { connectedApp as ContactusPage };