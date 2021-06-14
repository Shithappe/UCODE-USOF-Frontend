import React from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import './Login.css';
import back from './../back.png';



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { },
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
      Cookie.set("userId", response.data.user.id)
      Cookie.set("userLogin", response.data.user.login)
      Cookie.set("userRating", response.data.user.rating)
      Cookie.set("token", response.data.token);
      window.location.href = "/posts";
    })
    .catch(function (error) {
      alert('Incorrect login or password!')
      console.log(error);
    });
  }

  
  render() {
    return (
      
      <div className='BACK'>
         <div>
        <div className='Login '>
        
        <form  onSubmit={this.handleSubmit}>
        <h1>Login</h1>
              <input placeholder="Email" value={this.state.login} onChange={this.handleChangeLogin} />
          <input type="password" placeholder = "Password" value={this.state.password} onChange={this.handleChangePassword} />
          <input type="submit" value="Login" />
          <div className='link'>
          <Link to="register">Register</Link>
          <Link to="reset">Reset password</Link>
          </div>
        </form>
      </div>
      </div>
      </div>
    );
  }

  


  
}

export default Login;