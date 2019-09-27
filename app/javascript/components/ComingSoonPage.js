import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import astronautImage from 'images/coming_soon/astronaut'
import starImage from 'images/star'
import spaceshipImage from 'images/coming_soon/spaceship@2x.svg'
import marsWithSpaceshipImage from 'images/coming_soon/mars_with_spaceship'

class ComingSoonPage extends React.Component {
  render() {
    return (
      <div className="container status_page ">
        <div className="featurette text-center">
          <div className="row">
            <div className="col-md-4">
              <img src={astronautImage} className="img-fluid" />
            </div>
            <div className="col-md-4">
              <h1 className="featurette-heading">
                {I18n.t('pages.coming_soon.title')}
              </h1>
              <br /><br /><br />
              <h2 className="featurette-heading">
                {I18n.t('pages.coming_soon.subtitle')}
              </h2>
              <p className="lead">{I18n.t('pages.coming_soon.text')}</p>
              {/* <!-- <a href="<%=root_path%>" className="btn btn-outline-primary">
                <span className="glyphicon glyphicon-circle-arrow-right">{I18n.t('buttons.back_to_home_page')}</span>
              </a> --> */}
            </div>
            <div className="col-md-4 justify-content-center align-self-center">
              <img src={starImage} className="img-fluid" />
              {/* <img src={spaceshipImage} className="img-fluid" /> */}
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

export default ComingSoonPage