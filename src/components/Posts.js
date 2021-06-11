import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import './Posts.css';
import Like from '../Assets/heart-solid.svg'

export default function Posts({ posts, loading }){
    if (loading){
        return <h2>Loading...</h2>
    }

    return (
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
                        <span>{post.likes}</span>
                    </div>
                </li>
            ))}
        </ul>
    )
}
