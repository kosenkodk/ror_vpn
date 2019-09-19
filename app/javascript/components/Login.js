import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'


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
  }

  render() {
    // let formFields = {}
    // const { email, password } = this.state;
    return (
      <LoginForm handleFormSubmit={this.handleFormSubmit} />
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
  password: PropTypes.string
};

export default Login