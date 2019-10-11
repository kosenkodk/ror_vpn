import React from 'react'
import { Link } from 'react-router-dom'
import I18n from 'i18n-js/index.js.erb'
import astronautImage from 'images/coming_soon/astronaut'
import starImage from 'images/star'
// import spaceshipImage from 'images/coming_soon/spaceship@2x.svg'
import marsWithSpaceshipImage from 'images/coming_soon/mars_with_spaceship'

class SuccessPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="featurette">
          <div className="row status_page text-center">
            <div className="col-md-4">
              <img src={astronautImage} className="img-fluid" alt="" />
            </div>
            <div className="col-md-4">
              <h1 className="featurette-heading">

              </h1>
              <h2 className="featurette-heading">
                {I18n.t('pages.reset_pwd.success.title')}
                {/* {I18n.t('pages.reset_pwd.success.subtitle')} */}
              </h2>
              <p className="lead">
                {/* {I18n.t('pages.reset_pwd.success.subtitle')} */}
                {this.props.error && this.props.error}
                {this.props.notice && this.props.notice}
              </p>
              <Link to="/" className="btn btn-outline-primary btn-block">
                <span className="glyphicon glyphicon-circle-arrow-right ">{I18n.t('buttons.ok')}</span>
              </Link>
            </div>
            <div className="col-md-4 justify-content-center align-self-center">
              <img src={starImage} className="img-fluid" alt="" />
            </div>
            <div className="col-md-12">
              <img src={marsWithSpaceshipImage} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
        {/*<div className="container reset_pwd">
        <div className="featurette text-center">
          <div className="row">
            <div className="col-md-4 offset-md-4 text-center">
              <h1 className="featurette-heading">
                {I18n.t('pages.reset_pwd.success.title')}
              </h1>
              <p className="lead">
                {I18n.t('pages.reset_pwd.success.subtitle')}
              </p>
              <a href="/" className="btn btn-outline-primary btn-block">{I18n.t('buttons.ok')}</a>
            </div>
          </div>
        </div>
    </div>*/}
      </div>
    )
  }
}

export { SuccessPage }