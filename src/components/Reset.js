import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

export default function Reset() {
    const [email, setEmail] = useState('')
    const [isSent, setSent] = useState(false)

    const handleChangeEmail = e => {
      setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/reset",
      data: {
        email: email,//"2awdawd2@gmail.com",
      }
    })
    .then(function () {
        setSent(true)
    })
    .catch(function (error) {
        alert('Incorrect email!')
        console.log(error);
    });
    }

    return(
      <div className='BACK'>
        
        <div className='Login'>
          {isSent ? <h2 id="h2">Check your email</h2> :
          <form onSubmit={handleSubmit}>
            <h1>Reset password</h1>
            <input placeholder='Enter email' type="email" value={email} onChange={handleChangeEmail} />
            <input type="submit" value="Reset password" />
            <div className='link'>
              <Link to="login">Login</Link>
              <Link to="register">Register</Link>
            </div>
          </form>
}
        </div>
      </div>
    );
}
