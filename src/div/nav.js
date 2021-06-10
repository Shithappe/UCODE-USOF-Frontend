import React, { useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Image from './logo.png'

const nav = () => {

  function Logout(){
    alert(Cookies.get("token"));
    axios.post("http://127.0.0.1:8000/api/auth/logout", {}, { headers: {
      'Authorization': 'Bearer ' + Cookies.get("token")
    }})
    .then(function (response) {
        Cookies.remove("token");
        alert('Logout')
      })
      .catch(function (error) {
        Cookies.remove("token");
        console.log(error);
      });
  }

  function temp(){
    alert(Cookies.get("token"));
  }

  function temp1(){
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/auth/login",
      data: {
        email: "2awdawd2@gmail.com",
        password: "awd"
      }
    })
    .then(function (response) {
        Cookies.set("token", response.data.token);
        alert(response.data.token)
        // window.location.href = "/";
      })
      .catch(function (error) {
        alert(error)
      });
  }



  function Info_user(){
    if (Cookies.get('token') === undefined)
    return(
      <div>  
        <Link to="/login">Login</Link>
        <Link to="/my_page">My page</Link>
      </div>
    )
    else{
    return(
      <div className="navuserifno">
        <Link to="/my_page"><img src='https://raw.githubusercontent.com/Shithappe/metaphysical-beast/main/assets/images/stay.jpg' alt=""/></Link>
        <div className="navuserifno2">
          <span onClick={temp}>{Cookies.get('userLogin')}</span>
          <span>User</span>
          <button onClick={Logout}>Log out</button>
        </div>
      </div>
    )}
  }

  return(<nav>
      <div onClick={temp1} id="awd">
        <h1>usof.bug</h1>
        <img src={Image} alt=""/> 
      </div>
      <ul>
        <Link to="/create_post">Create post</Link>
        <Link to="/posts">All posts</Link>
        <Link to="/about">Category</Link>
        <Link to="/users">Users</Link>
      </ul>
      <div className="search">
        <input type='text' placeholder="seach"/>
      </div>
      <Info_user />
  </nav>)
}
  
export default nav