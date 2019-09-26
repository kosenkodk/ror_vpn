import React from 'react'

class SecurityAndTrust extends React.Component {
  render() {
    return (
      <div id="security_and_trust" class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4 offset-md-4">
            <div class="card-body">
              <h1 class="card-title">Built for security and trust</h1>
            </div>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-md-4">
            <div class="card-body">
            </div>
          </div>
          <div class="col-md-4">
            <div class="card-body">
              <h5 class="card-title">Private</h5>
              <p class="card-text">Keep your real location and Unique IP address hidden, prevent Anyone from viewing your
                Internet activity.
        </p>
              {/* <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> --> */}
            </div>
          </div>
          <div class="col-md-4">
            <div class="card-body">
              <h5 class="card-title">Secure</h5>
              <p class="card-text">Use WiFi Hotspots Safe From cyber criminals, block incoming threats and DDoS Attacks With
                Our Firewall.
        </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SecurityAndTrust