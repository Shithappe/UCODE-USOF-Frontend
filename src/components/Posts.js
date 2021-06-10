import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import './Posts.css';

export default function Posts({ posts, loading }){
    if (loading){
        return <h2>Loading...</h2>
    }
    let text = [];

    function temp1(id){
        window.location.href = "/post/"+id;
    }

    return (
        <ul className="posts">
            {posts.map(post => (
                <li key={post.id}>
                    <h3>{post.title}</h3>
                    <hr/>
                    <p>{text = post.content.match( /[^\.!\?]+[\.!\?]+["']?|.+$/g ).slice(0, 3).join(' ')}</p>
                    <hr/>
                    <button onClick={()=>temp1(post.id)}>Read more</button>
                </li>
            ))}
        </ul>
    )
}
