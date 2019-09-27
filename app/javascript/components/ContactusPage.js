import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import marsWithSpaceshipImage from 'images/coming_soon/mars_with_spaceship'
import ContactusForm from './ContactusForm'


class ContactusPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email, message, message_short) {
    console.log(email, message, message_short)
    e.preventDefault();
  }

  render() {
    return (
      <div className="container contact_us mt-5 pt-5">
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
                <ContactusForm handleFormSubmit={this.handleFormSubmit} />
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

export default ContactusPage