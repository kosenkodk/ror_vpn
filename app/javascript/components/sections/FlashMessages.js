import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class FlashMessages extends React.Component {
  render() {
    let { error, notice } = this.props
    return (
      <React.Fragment>
        {
          error.length > 0 && <div className={`alert ${error ? "alert-danger" : ""}`} role="alert">
            {error}
          </div>
        }
        {
          notice.length > 0 && <div className={`alert ${notice ? "alert-success" : ""}`} role="alert">
            {notice}
          </div>
        }
      </React.Fragment>
    )
  }
}

export default FlashMessages