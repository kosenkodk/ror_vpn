import React from 'react'
import Footer from './Footer'
import FooterAccordion from './FooterAccordion'

class FooterSection extends React.Component {
  render() {
    return (
      <div class="container-fluid footer">
        <div class="row">
          <div class="container-fluid d-block d-sm-none">
            <FooterAccordion />
          </div>
          <div class="container d-none d-sm-block">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}
export default FooterSection