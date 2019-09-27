import React from 'react'
import I18n from 'i18n-js/index.js.erb'
import astronautImage from 'images/coming_soon/astronaut'
import starImage from 'images/star'
import spaceshipImage from 'images/coming_soon/spaceship@2x.svg'
import marsWithSpaceshipImage from 'images/coming_soon/mars_with_spaceship'

class ComingSoonPage extends React.Component {
  render() {
    return (
      <div class="container status_page ">
        <div class="featurette text-center">
          <div class="row">
            <div class="col-md-4">
              <img src={astronautImage} class="img-fluid" />
            </div>
            <div class="col-md-4">
              <h1 class="featurette-heading">
                {I18n.t('pages.coming_soon.title')}
              </h1>
              <br /><br /><br />
              <h2 class="featurette-heading">
                {I18n.t('pages.coming_soon.subtitle')}
              </h2>
              <p class="lead">{I18n.t('pages.coming_soon.text')}</p>
              {/* <!-- <a href="<%=root_path%>" class="btn btn-outline-primary">
                <span class="glyphicon glyphicon-circle-arrow-right">{I18n.t('buttons.back_to_home_page')}</span>
              </a> --> */}
            </div>
            <div class="col-md-4 justify-content-center align-self-center">
              <img src={starImage} class="img-fluid" />
              {/* <img src={spaceshipImage} class="img-fluid" /> */}
            </div>
            <div class="col-md-12">
              <img src={marsWithSpaceshipImage} class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ComingSoonPage