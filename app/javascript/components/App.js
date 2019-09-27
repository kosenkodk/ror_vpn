import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Header from './Header'
import FooterSection from './sections/FooterSection'
import Login from './Login'
import Features from './Features'
import Router from './Router'
import ComingSoonPage from './ComingSoonPage'
import Home from './HomePage/Home'
import NotFoundPage from './NotFoundPage'
import SuccessPage from './SuccessPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFooterVisible: true
    }
    this.handleIsFooterVisible = this.handleIsFooterVisible.bind(this);
  }

  handleIsFooterVisible(isVisible) {
    event.preventDefault()
    this.setState({
      isFooterVisible: isVisible
    })
  }

  render() {
    return (
      <div>
        <div className={`container-fluid ${this.props.path === '404' || this.props.path === '200' ? "bg1" : "bg_star"}`}>
          <div className="row">
            <div className="container">
              <Header />
            </div>
            <div className={this.props.path === '/' ? 'row' : 'container'}>
              <Router path={this.props.path} context={{}} >
                {/* <Route path="/" exact render={() => (<div>home react {this.props.path} </div>)} /> */}
                <Route exact path="/" render={() => <Home features={this.props.features} />} />
                <Route exact path="/login" render={() => <Login handleIsFooterVisible={this.handleIsFooterVisible} isFooterVisible={false} form_action='/login' token={this.props.token} />} />
                <Route exact path="/signup" render={() => <ComingSoonPage />} />
                <Route exact path="/contact_us" render={() => <ComingSoonPage />} />
                <Route exact path="/coming_soon" render={() => <ComingSoonPage />} />
                <Route exact path="/status_page" render={() => <ComingSoonPage />} />
                <Route exact path="/forgot" render={() => <ComingSoonPage />} />
                <Route exact path="/reset" render={() => <ComingSoonPage />} />
                <Route exact path="/pricing" render={() => <ComingSoonPage />} />
                <Route exact path="/help" render={() => <ComingSoonPage />} />
                <Route exact path="/404" render={() => <NotFoundPage />} />
                <Route exact path="/200" render={() => <SuccessPage />} />
                <Route exact path="/204" render={() => <ComingSoonPage />} />
                {/* <Route exact path="/500" render={() => <InternalErrorPage />} /> */}

                <Route exact path="/features" render={() => <Features />} />
              </Router>
            </div>
          </div>
        </div>
        {this.state.isFooterVisible && <FooterSection />}
      </div>
    );
  }
}

App.propTypes = {
  token: PropTypes.string,
  path: PropTypes.string,
};

// const App = props => (
//   <Router path={props.path} context={props}>
//     <Route path="/" exact render={(props) => (<div>token: {props.token}</div>)} />
//     <Route exact path="/login" render={() => <Login />} />
//     <Route exact path="/features" render={() => <Features />} />
//   </Router>
// )

export default App
