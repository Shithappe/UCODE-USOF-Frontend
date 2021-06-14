import React, { useState } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

export default function Register() {
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChangeLogin = e => {
        setLogin(e.target.value);
    }
    const handleChangeEmail = e => {
        setEmail(e.target.value);
    }
    const handleChangePassword = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/register",
      data: {
        login: login,
        email: email,
        password: password
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
        alert('Incorrect')
        console.log(error);
    });
    }

    

    return(
      <div className='BACK'>
        
        <div className='Login'>
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input placeholder="Login" value={login} onChange={handleChangeLogin} />
            <input placeholder="Email" type="email" value={email} onChange={handleChangeEmail} />
            <input placeholder="Password" type="password" value={password} onChange={handleChangePassword} />
            <input placeholder="Confirmation password" type="password" value={password} onChange={handleChangePassword} />
            <input type="submit" value="Sing up" />
            <div>
            <Link to="login">Login</Link>
            <Link to="reset">Reset password</Link>
            </div>
          </form>
      </div>
      </div>
    );
}
