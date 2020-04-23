import React from 'react'
// import imgSecuritySrc from 'images/compare/security_and_trust_img_with_text'

class SecurityAndTrust extends React.Component {
  render() {
    return (
      <div id="security_and_trust" className="row card d-flex flex-column">
        {/* <img src={imgSecuritySrc} className=" img-fluid" /> */}

        <div className="row no-gutters d-flex align-items-center">
          <div className="col-md-4 offset-md-4">
            <div className="card-body">
              <h1 className="card-title">Built for security and trust</h1>
            </div>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card-body d-none d-md-block"></div>
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">Private</h5>
              <p className="card-text">Keep your real location and Unique IP address hidden, prevent Anyone from viewing your
                Internet activity.
              </p>
              {/* <!-- <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> --> */}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">Secure</h5>
              <p className="card-text">Use WiFi Hotspots Safe From cyber criminals, block incoming threats and DDoS Attacks With
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