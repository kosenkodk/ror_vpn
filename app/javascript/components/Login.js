import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import { withRouter } from "react-router-dom";

class Login extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   email: props.email,
    //   password: props.password
    // };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(e, email, password) {
    console.log(email, password)

    e.preventDefault();
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    // console.log('csrf:' + csrf)
    // console.log('csrf token:' + this.props.token)
    const postData = { 'email': email, 'password': password }
    fetch('/api/v1/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, cors, *same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // same-origin, include, *same-origin, omit
      // redirect: 'follow', // manual, *follow, error,
      // referrer: 'no-referrer', // no-referrer, *client
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify(postData), // data type should the same value as Content-Type header
    }).then((response) => { return response.json() })
      .then((item) => {
        console.log('success', item)
        // this.addNewItem(item)
        // navigate to the admin panel
        // this.props.history.push('/tariff_plans') # TODO: will implement react component
        this.props.history.push('/features')
      }).catch((err) => {
        console.log(err)
        this.props.history.push('/')
      });
  }

  // addNewItem(item) {
  //   this.setState({
  //     items: this.state.items.concat(item)
  //   })
  // }

  render() {
    // let formFields = {}
    // const { email, password } = this.state;
    return (
      <div className="login">
        <div className="featurette text-center">
          <div className="row">

            <div className="col-md-8 offset-md-2 text-center">
              <h1 className="featurette-heading">
                {/* hi <%= I18n.t('pages.login.title') %> */}
              </h1>
              <p className="lead">
                {/* <%= t('pages.login.do_not_have_an_account') %> */}
                {/* <%= link_to t("pages.signup.title"), signup_path %> */}
              </p>
            </div>

            <div className="col-md-8 offset-md-2">
              <div className="text-right">
                <LoginForm token={this.props.token} form_action={this.props.form_action} forgot_pwd_path={this.props.forgot_pwd_path} handleFormSubmit={this.handleFormSubmit} />
              </div>
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  {/* <%= link_to t("pages.login.form.login_trouble"), forgot_pwd_path, {class:'trouble'} %> */}
                </div>
              </div>
            </div>

            <div className="col-md-12">
              {/* <%#= image_tag 'coming_soon/mars_with_spaceship.png', {class:'img-fluid'} #%> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // if (this.props.email || this.props.password) {
    //   console.log('use props')
    //   // this.setState({ features: this.props.features })
    //   return;
    // }

    // console.log('getting data from api...')

    // const url = "api/v1/login";
    // fetch(url)
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error("Network response was not ok.");
    //   })
    //   .then(response => this.setState({ features: response }))
    //   .catch((err) => {
    //     console.log(err)
    //   });
  }

}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  form_action: PropTypes.string,
  forgot_pwd_path: PropTypes.string,
  token: PropTypes.string
};

export default withRouter(Login)
// export default Login