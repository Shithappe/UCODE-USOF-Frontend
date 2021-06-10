import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllPosts from './components/AllPosts'
import Nav from './div/nav'
import Login from './components/Login';
import Reset from './components/Reset';
import MyPage from './components/MyPage';
import Register from './components/Register';
import Post from './components/Post';
import CreatePost from './components/CreatePost';
import styles from './App.css'; 
import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
        <Router>
            <Nav />
            <Switch>
              <Route path="/about"><About /></Route>
              <Route path="/users"><Users /></Route>
              <Route path="/posts"><AllPosts /></Route>
              <Route path="/login"><Login /></Route>
              <Route path="/reset"><Reset /></Route>
              <Route path="/user/:id" render={({match}) => (  <MyPage id={match.params.id} />)}/>
              <Route path="/register"><Register /></Route>
              <Route path="/post/:id" render={({match}) => (  <Post id={match.params.id} />)}/>   
              <Route path="/create_post"><CreatePost /></Route>
            </Switch>
        </Router>
      );
    }
    
    
    function About() {
      return <h2>About</h2>;
    }
    
    function Users() {
      const [users, setUsers] = useState([])
      useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/users", { headers: {
          'Authorization': 'Bearer ' + Cookies.get("token")}
          })
          .then(function (response) {
              setUsers(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [])
      return users.map((user) =>
        <li>{user.login},{user.rating}</li>
    );
    }
    

