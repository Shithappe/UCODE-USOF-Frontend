import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import './Post.css'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Like from '../Assets/heart-solid.svg'
import Parser from 'html-react-parser';


export default function Post ({ id }) {
    const [post, setPost] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [commments, setCommments] = useState([])
    useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/post/"+id, { headers: {
        }
          })
          .then(function (response) {
            setPost(response.data)
            console.log(response.data.content)
            setTitle(response.data.title)
            setContent(response.data.content)
            setAuthor(response.data.author)
          })
          .catch(function (error) {

            console.log(error);
        });
    
          
    axios.get("http://127.0.0.1:8000/api/posts/"+id+"/comments", { headers: {}})
      .then(function (response) {
        setCommments(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }, [])

    const [newComment, setNewComment] = useState('')

    const handleChangeComment = e => {
      setNewComment(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/api/posts/"+id+"/comments", 
        headers: { 'Authorization': 'Bearer ' + Cookies.get("token")},
        data: {
          content: newComment
        }
        })
    .then(function () {
      window.location.href = "/post/"+id;
    })
    .catch(function (error) {
        console.log(error);
    });
    }

    function add_like(){
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/api/posts/"+post.id+"/likes", 
        headers: { 'Authorization': 'Bearer ' + Cookies.get("token")},
        data: { }
        })
    .then(function (response) {
      console.log(response)
      window.location.href = "/post/"+id;
    })
    .catch(function (error) {
        console.log(error);
    });
    }

    return (
        <div className='Post'>
            <h1>{title}</h1>
            <p>{content}</p><br/>
            <Link to={'/user/'+post.user_id}>{post.author}</Link>
            <div className='like' onClick={add_like}>
              <img src={Like} alt=""/> 
              <div>{post.likes}</div>
            </div>
           
            <h2>Comments</h2>
            <div className='Comment'>
            {commments.map(commment => (
                <li key={commment.id}>
                  <Link to={'/user/'+commment.user_id}>{commment.author}</Link>
                  <p>{commment.content}</p>
                  
                  <div className='like'>
                        <img src={Like} alt=""/> 
                        <div>{commment.likes}</div>
                    </div>
                    <br/>
                </li>
            ))}

            </div>
      <form onSubmit={handleSubmit}>
          <p><textarea rows="6" cols="80" value={newComment} onChange={handleChangeComment}></textarea></p>
          <input id='b' type="submit" value="Comment" />
      </form>
        </div>
    )
}

