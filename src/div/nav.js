import React, { useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Image from './logo.png'
import ImageUser from '../Assets/user-astronaut-solid.svg'

const nav = () => {

  function Logout(){
    axios.post("http://127.0.0.1:8000/api/auth/logout", {}, { headers: {
      'Authorization': 'Bearer ' + Cookies.get("token")
    }})
    .then(function (response) {
        Cookies.remove("token");
        window.location.href = "/posts";
      })
      .catch(function (error) {
        Cookies.remove("token");
        console.log(error);
      });
  }

  function temp(){
    alert(Cookies.get("token"));
  }



  function Info_user(){
    if (Cookies.get('token') === undefined)
    return(
      <div>  
        <Link to="/login">Login</Link>
        <br/>
        <Link to="register">Register</Link>
        
      </div>
    )
    else{
    return(
      <div className="navuserifno">
        <Link to={"/user/" + Cookies.get('userId')}><img src={ImageUser} alt=""/></Link>
        <div className="navuserifno2">
          <span onClick={temp}>{Cookies.get('userLogin')}</span>
          <button onClick={Logout}>Log out</button>
        </div>
      </div>
    )}
  }

  return(<nav>
      <div onClick={e=>window.location.href = "/"} id="awd">
        <h1>usof.bug</h1>
        <img src={Image} alt=""/> 
      </div>
      <ul>
       <li><Link to="/create_post">Create post</Link></li>
       <li><Link to="/posts">All posts</Link></li>
       <li><Link to="/categories">Category</Link></li>
       
        
        
      </ul>
      <div className="search">
        <input type='text' placeholder="seach"/>
      </div>
      <Info_user />
  </nav>)
}
  
export default nav