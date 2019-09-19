import React from 'react'
import PropTypes from 'prop-types'
class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    // this.formFields = React.createRef()
    this.email = React.createRef()
    this.password = React.createRef()
    this.state = {
      emailValue: '',
      passwordValue: ''
      //   email: props.email,
      //   password: props.password
    };
    //   // this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit2(e, email, password) {
    console.log('handleFormSubmit2')
    console.log(email, password)
    this.setState({ emailValue: email })
    this.setState({ passwordValue: password })
    e.preventDefault();
  }


  handleFormSubmit3 = e => {
    console.log('handleFormSubmit3')
    this.setState({ emailValue: this.email.value, passwordValue: this.password.value })
    e.preventDefault();
  };

  render() {
    let formFields = {}
    // const { email, password } = this.state;
    return (
      <div id="login" className="login row">
        <form onSubmit={(e) => { this.props.handleFormSubmit(e, this.email.value, this.password.value); e.target.reset(); }}>
          {/* <form onSubmit={this.handleFormSubmit3}> */}
          {/* <form onSubmit={(e) => { this.handleFormSubmit2(e, this.email.value, this.password.value); e.target.reset(); }}> */}
          <h3>password: {this.state.passwordValue}</h3>

          <div className="form-group row">

            <div className="col-sm-3">
              <label>email:{this.state.emailValue}</label>
            </div>
            <div className="col-sm-6">
              <input ref={(input) => { this.email = input }} placeholder='Enter the email' />
            </div>
            <div className="col-sm-3">
            </div>


            <input ref={(input) => { this.password = input }} placeholder='Enter the password' />
            {/* <input ref={this.email} placeholder='Enter the email' />
        <input ref={this.password} placeholder='Enter the password' /> */}
            <button>Submit</button>
            {/* <LoginForm handleFormSubmit={this.handleFormSubmit} /> */}
          </div>
        </form>
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

LoginForm.propTypes = {
  // email: PropTypes.string,
  // password: PropTypes.string,
  // handleFormSubmit: PropTypes.function
};

export default LoginForm