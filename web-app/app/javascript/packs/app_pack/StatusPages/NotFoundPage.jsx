import React from 'react'
import { Link } from 'react-router-dom'
import { I18n } from 'helpers'
import astronautImage from 'images/coming_soon/astronaut_error'
import starImage from 'images/star'
import bg2WithMarsImage from 'images/bg2_with_mars'
import { connect } from 'react-redux'

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="container status_page">
        <div className="featurette text-center">
          <div className="row align-items-end" style={{ minHeight: this.props.height }}>
            <div className="col-md-4 align-self-center">
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
              <Link to="/" className="btn btn-outline-primary">
                <span className="glyphicon glyphicon-circle-arrow-right">{I18n.t('buttons.back_to_home_page')}</span>
              </Link>
            </div>
            <div className="col-md-4 align-self-center">
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

function mapStateToProps(state) {
  const { page } = state;
  const { height } = page;
  return {
    height
  };
}

const connectedPage = connect(mapStateToProps)(NotFoundPage);
export { connectedPage as NotFoundPage };