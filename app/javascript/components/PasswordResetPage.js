import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import PasswordResetForm from './PasswordResetForm'

class PasswordResetPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email, password) {
    console.log(email, password)
    e.preventDefault()
  }

  render() {
    return (
      <div className="container reset_pwd">
        <div className="featurette text-center">
          <div className="row">
            <div className="col-md-8 offset-md-2 text-center">
              <h1 className="featurette-heading">
                {I18n.t('pages.reset_pwd.title')}
              </h1>
              <p className="lead">
                {I18n.t('pages.reset_pwd.subtitle')}
              </p>
            </div>

            <div className="col-md-8 offset-md-2">
              <div className="text-right">
                <PasswordResetForm handleFormSubmit={this.handleFormSubmit} />
              </div>
            </div>

            <div className="col-md-12">
              {/* <img src={Image_mars_with_spaceship} className="img-fluid" /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.handleIsFooterVisible(false)
  }
  componentWillUnmount() {
    this.props.handleIsFooterVisible(true)
  }
}

export default PasswordResetPage