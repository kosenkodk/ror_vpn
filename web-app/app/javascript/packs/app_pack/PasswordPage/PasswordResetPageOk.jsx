import React from 'react'
import { Link } from 'react-router-dom'
import { I18n } from 'helpers'
import { connect } from 'react-redux'

class PasswordResetPageOk extends React.Component {

  constructor(props) {
    super(props);
    // this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email, password) {
    // console.log(email, password)
    e.preventDefault()
  }

  render() {

    return (
      <div className="container reset_pwd">
        <div className="featurette text-center vh-100">
          <div className="row align-content-center h-50"
          // style={{ minHeight: this.props.height }}
          >
            <div className="col-md-4 offset-md-4 text-center">
              <h1 className="featurette-heading">
                {I18n.t('pages.reset_pwd.success.title')}
              </h1>
              <p className="lead">
                {I18n.t('pages.reset_pwd.success.subtitle')}
              </p>
              <Link to="/" className='btn btn-outline-primary btn-block'>{I18n.t('buttons.ok')}</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // this.props.handleIsFooterVisible(false)
  }
  componentWillUnmount() {
    // this.props.handleIsFooterVisible(true)
  }
}

// export { PasswordResetPageOk }
function mapStateToProps(state) {
  const { page } = state;
  const { height } = page;
  return {
    height
  };
}

const connectedPage = connect(mapStateToProps)(PasswordResetPageOk);
export { connectedPage as PasswordResetPageOk };
