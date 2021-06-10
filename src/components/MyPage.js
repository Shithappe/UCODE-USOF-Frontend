import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import './MyPage.css'
import ImageUser from '../Assets/user-astronaut-solid.svg'
import Like from '../Assets/heart-solid.svg'

export default function MyPage ( {id} ) {
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState('')
  const [role, setRole] = useState('')

  const [posts, setPost] = useState([])

    if (Cookie.get("token") === undefined) window.location.href = "/login";
 
      useEffect(() => {
        axios({
          method: 'get',
          url: "http://127.0.0.1:8000/api/users/"+id,
          headers: { 'Authorization': 'Bearer ' + Cookie.get("token")}
        })
        .then(function (response) {
          setName(response.data.name)
          setLogin(response.data.login)
          setEmail(response.data.email)
          setRating(response.data.rating)
          setRole(response.data.role)
          })
        .catch(function (error) {
          console.log(error);
        });

        axios({
          method: 'get',
          url: "http://127.0.0.1:8000/api/user_posts/"+id,
          headers: { 'Authorization': 'Bearer ' + Cookie.get("token")}
        })
        .then(function (response) {
          setPost(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }, [])

    return (
        <div className='main'>
          <h1> </h1>
          <br/>
          <div className="userInfo">
            <img src={ImageUser} alt=""/>
            <div>
              <span>{rating}</span>
              <br/>
              <span >{name}</span>
              <br/>
              <span >{login}</span>
              <br/>
              <span >{email}</span>
              <br/>
              <span >{role}</span>
            </div>
          </div>
          <div className="userPost">
            {posts.length == 0 ? <h2>No posts</h2> : 
              <ul className="posts">
                {posts?.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <hr/>
                        <p>{post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g ).slice(0, 3).join(' ')}</p>
                        <hr/>
                        <button onClick={()=>window.location.href = "/post/"+post.id}>Read more</button>
                        <div className="like">
                            <img src={Like} alt=""/> 
                            <span>{post.likes}</span>
                        </div>
                    </li>
                ))}
              </ul>
            } 
          </div>

         </div>
    )
}
