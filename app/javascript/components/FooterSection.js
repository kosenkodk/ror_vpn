import React from 'react'
import Footer from './Footer'
import FooterAccordion from './FooterAccordion'

class FooterSection extends React.Component {
  render() {
    return (
      <div className="container-fluid footer">
        <div className="row">
          <div className="container-fluid d-block d-sm-none">
            <FooterAccordion />
          </div>
          <div className="container d-none d-sm-block">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}
export default FooterSection