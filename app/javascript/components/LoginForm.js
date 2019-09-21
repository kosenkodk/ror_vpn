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
      passwordValue: '',
      // email: props.email,
      // password: props.password
    };
    //   // this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit2(e, email, password) {
    console.log('handleFormSubmit2')
    console.log(email, password)
    this.setState({ emailValue: email, passwordValue: password })
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
      <form data-remote="true" method="post" action={this.props.form_action} onSubmit={(e) => { e.target.reset(); }}>
        {/* <form onSubmit={(e) => { this.handleFormSubmit2(e, this.email.value, this.password.value); e.target.reset(); }}> */}
        {/* <form onSubmit={this.handleFormSubmit3}> */}

        <div className="form-group row">
          <div className="col-sm-3">
            <label>Email address {this.state.emailValue}</label>
          </div>
          <div className="col-sm-6">
            <input type='hidden' name='authenticity_token' value={this.props.token} />
            <input className="form-control" ref={(input) => { this.email = input }} placeholder='Enter the email' />
          </div>
          <div className="col-sm-3">
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-3">
            <label className="col-form-label">Password {this.state.passwordValue}</label>
          </div>
          <div className="col-sm-6">
            <div className="input-group">
              <input className="form-control" ref={(input) => { this.password = input }} placeholder='Enter the password' />
              <div className="input-group-append">
                <span className="input-group-text" id="forgot-pwd-addon"><a
                  href={this.props.forgot_pwd_path}>
                  Forgot Password?
                </a></span>
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-6 offset-sm-3">
            <br />
            {/* <%=f.submit(t("pages.login.form.login"), {id: 'contact_submit', class:'btn btn-outline-primary btn-block'})%> */}
            <button onClick={(e) => { this.props.handleFormSubmit(e, this.email.value, this.password.value); }} className="btn btn-outline-primary btn-block">Submit</button>
            {/* <LoginForm handleFormSubmit={this.handleFormSubmit} /> */}
          </div>
        </div>

      </form >
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
  email: PropTypes.string,
  password: PropTypes.string,
  forgot_pwd_path: PropTypes.string
  // handleFormSubmit: PropTypes.function
};

export default LoginForm