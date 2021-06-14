import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";

import './Post.css'
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import Like from '../Assets/heart-solid.svg';
import CreatePost from './CreatePost';
import imgEdit from './../Assets/edit-solid.svg'


export default function Post ({ id }) {
    const [userId, setUserId] = useState('')
    const [post, setPost] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [categories, setCategories] = useState([]);
    const [categories1, setCategories1] = useState([]);
    const [commments, setCommments] = useState([])
    const [edit, setEdit] = useState(false)

    useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/post/"+id)
          .then(function (response) {
            setPost(response.data)
            setUserId(response.data.user_id)
            setTitle(response.data.title)
            setContent(response.data.content)
            setAuthor(response.data.author)
            setCategories(response.data.categories)
            console.log(response.data.categories)
          })
          .catch(function (error) {         console.log(error);      });

          axios({
            method: 'get',
            url: "http://127.0.0.1:8000/api/categories/"
          })
          .then(function (response) {
            setCategories1(response.data)
            setCategories1(response.data.map((categ) => { console.log(categories); //if (categories.id.includes(categ.id, 0)) alert(categ.title);
              return {value: categ.id, label: categ.title}
          }))
          })
          .catch(function (error) {
              console.log(error);
          });
    
          
    axios.get("http://127.0.0.1:8000/api/posts/"+id+"/comments", { headers: {}})
      .then(function (response) {        setCommments(response.data)})
      .catch(function (error)   {        console.log(error);        });
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
        headers: { 'Authorization': 'Bearer ' + Cookie.get("token")},
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
        headers: { 'Authorization': 'Bearer ' + Cookie.get("token")},
        data: { }
        })
    .then(function (response) {
      // console.log(response)
      window.location.href = "/post/"+id;
    })
    .catch(function (error) {
        console.log(error);
    });
    }
  

//     function awd(){
//       console.log(categories, '1111111', categories1)
//       for (let i =0; i< categories1.length; i++){
//         if (categories1.includes(categories1.id, 0)) console.log(categories1.title);
//       }
//         let a = [1, 2 ,3, 4, 5];
//         let b = {
//           id:4
//         }
//         // for (let i =0; i< a.length; i++) if (a.includes(b.id, 0)) alert("w")

//     }

// awd()

    if (edit) return(
      <div>
        <CreatePost post={post} />
      </div>
    )
    else
    return (
        <div className='Post'>
            <h1>{title}  {userId == Cookie.get("userId") ? <img id='imgEdit' onClick={()=>setEdit(true)} src={imgEdit} />:<br/>}</h1>
           
            


            <p>{content}</p><br/>
            <Link to={'/user/'+post.user_id}>{post.author}</Link>

            <div className='like' onClick={add_like}>
              <img src={Like} alt=""/> 
              <div>{post.likes}</div>
            </div>
            <hr/>
              
            {categories1.map((category) =>  
              <div className="cat"><Link to={"/category/"+category.value}>{category.label}</Link></div>)}
           
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

