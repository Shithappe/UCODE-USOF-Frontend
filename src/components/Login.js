import React from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Cookies from 'js-cookie';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };

    this.handleChangeLogin = this.handleChangelogin.bind(this);
    this.handleChangePassword = this.handleChangepassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangelogin(event) {
    this.setState({login: event.target.value});
  }

  handleChangepassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/login",
      data: {
        email: this.state.login,//"2awdawd2@gmail.com",
        password: this.state.password,//"awd"
      }
    })
    .then(function (response) {
      Cookie.set("userLogin", response.data.user.login)
        Cookie.set("token", response.data.token);
        window.location.href = "/posts";
      })
      .catch(function (error) {
        alert(error)
        alert('Incorrect login or password!')
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" value={this.state.login} onChange={this.handleChangeLogin} />
        <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
      <input type="submit" value="Login" />
      <Link to="reset">Reset password</Link>
      <Link to="register">Register</Link>
    </form>
    );
  }
}

export default Login;