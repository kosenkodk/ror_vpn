import React from 'react'
import { I18n } from 'helpers'
import astronautImage from 'images/coming_soon/astronaut'
import starImage from 'images/star'
import bg2WithMarsImage from 'images/bg2_with_mars'


class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="container status_page">
        <div className="featurette text-center">
          <div className="row">
            <div className="col-md-4">
              <img src={astronautImage} className="img-fluid" />
            </div>
            <div className="col-md-4">
              <h1 className="featurette-heading">
                {I18n.t('pages.not_found.title')}
              </h1>
              <h2 className="featurette-heading">
                {I18n.t('pages.not_found.subtitle')}
              </h2>
              <p className="lead">{I18n.t('pages.not_found.text')}</p>
              <a href="/" className="btn btn-outline-primary">
                <span className="glyphicon glyphicon-circle-arrow-right">{I18n.t('buttons.back_to_home_page')}</span></a>
            </div>
            <div className="col-md-4 justify-content-center align-self-center">
              <img src={starImage} className="img-fluid" />
            </div>
            <div className="col-md-12">
              <img src={bg2WithMarsImage} className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundPage