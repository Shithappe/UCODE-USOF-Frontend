import React from 'react';
import './Posts.css';
import Like from '../Assets/heart-solid.svg'

export default function Posts({ posts, loading }){
    if (loading){
        return <h2>Loading...</h2>
    }

    return (
        <ul className="posts">
            {posts.map(post => (
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
    )
}
