import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class FlashMessages extends React.Component {
  render() {
    let { error, notice } = this.props
    return (
      <React.Fragment>
        {
          error && error.length > 0 && <div id="flash_message" className={`alert ${error ? "alert-danger" : ""} text-center`} role="alert">
            {error}
          </div>
        }
        {
          notice && notice.length > 0 && <div id="flash_message" className={`alert ${notice ? "alert-success" : ""} text-center`} role="alert">
            {notice}
          </div>
        }
      </React.Fragment>
    )
  }
}

export default FlashMessages