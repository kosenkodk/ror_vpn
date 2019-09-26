import React from 'react'
import I18n from 'i18n-js/index.js.erb'

class ReviewSummary extends React.Component {
  render() {
    return (
      <div class="card-body">
        <div id="summary">
          <p class="card-text collapse" id="collapseSummary">
            The NSA has built an infrastructure that allows it to intercept almost everything. With this capability, the
            vast majority of human communications are automatically ingested without targeting. If I wanted to see your
            emails or your wife's phone, all I have to do is use intercepts. I can get your emails, passwords, phone
            records, credit cards. I don't want to live in a society that does these sort of things... I do not want to
            live
            in a world where everything I do and say is recorded. That is not something I am willing to support or live
            under.
    </p>
          <a class="a-color-pink text-decoration-none collapsed" data-toggle="collapse" href="#collapseSummary"
            aria-expanded="false" aria-controls="collapseSummary"></a>
        </div>
      </div>
    )
  }
}
export default ReviewSummary