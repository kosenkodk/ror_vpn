import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import marsWithSpaceshipImage from 'images/coming_soon/mars_with_spaceship'
import ContactusForm from './ContactusForm'
import FlashMessages from './sections/FlashMessages'


class ContactusPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.state = {
      error: '',
      notice: ''
    }
  }

  handleFormSubmit(e, email, message, message_short) {
    console.log(email, message, message_short);

    let csrf = ''
    try {
      csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      // csrf = $('meta[name="csrf-token"]').content //.attr('content')
    } catch (e) { }
    const postData = { 'email': email, 'message_short': message_short, 'message': message };
    fetch('/api/v1/contacts', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include', // same-origin, include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify(postData), // data type should the same value as Content-Type header
    }).then((response) => {
      this.setState({ error: '', notice: '' })

      if (response.ok) {
        return response.text();
        // return [response.text(), response.status]
        // return { response.text, response.status }
      }
      throw response //new Error('Network response was not ok.');
    })
      .then((message) => {
        console.log('success', message)
        this.setState({ notice: message })
        // console.log('success', response.text(), response.status);
        // this.props.history.push('/200')
      }).catch((response) => {
        response.text().then((message) => {
          console.log('error', message)
          this.setState({ error: message })
          // (response.status === 200) ? this.setState({ notice: message }) : this.setState({ error: message })
        })
        // this.props.history.push('/404')
      });

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
                <div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-8 text-center">
                    <FlashMessages error={this.state.error} notice={this.state.notice} />
                  </div>
                </div>
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