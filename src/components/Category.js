import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import './Posts.css';
import Like from '../Assets/heart-solid.svg'
import axios from 'axios';
import './Posts.css';

export default function Category({id}) {

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        axios({
          method: 'get',
          url: "http://127.0.0.1:8000/api/get_post_by_cat/" + id
        })
        .then(function (response) {
            setPosts(response.data);
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error);
          });
    }, [])

    return (
        <div>
              <ul className="posts">
            {posts.map(post => (
                <li key={post.id} >
                    <Link to={"/post/"+post.id}><h2>{post.title}</h2></Link>
                    <hr/>
                    <p>{post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g ).slice(0, 3).join(' ')}</p>
                    <hr/>
                    <Link to={'/user/'+post.user_id}>{post.author}</Link>
                    <div className="like">
                        <img src={Like} alt=""/> 
                        <span>{post.like}</span>
                    </div>
                </li>
            ))}
        </ul>
        </div>
    )
}
