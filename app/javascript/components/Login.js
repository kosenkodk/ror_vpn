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
    let body = { 'email': email, 'password': password }

    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => { return response.json() })
      .then((item) => {
        // this.addNewItem(item)
        // navigate to the admin panel
        this.props.history.push('/tariff_plans')
        // this.props.history.push('/features')
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
      <LoginForm forgot_pwd_path={this.props.forgot_pwd_path} handleFormSubmit={this.handleFormSubmit} />
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
  forgot_pwd_path: PropTypes.string
};

export default withRouter(Login)