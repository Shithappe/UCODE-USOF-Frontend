import React, { useState } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState('');

    if (Cookie.get("token") === undefined) window.location.href = "/login";
    else{
        
        const handleChangeTitle = e => {setTitle(e.target.value);}
        const handleChangeContent = e => {setContent(e.target.value);}
        const handleChangeCategories = e => {setCategories(e.target.value);}
    
        const handleSubmit = (e) => {
          e.preventDefault();
        axios({
          method: 'post',
          url: "http://127.0.0.1:8000/api/posts",
          headers: { 'Authorization': 'Bearer ' + Cookie.get("token")},
          data: {
            title: title,
            content: content,
            categories: categories
          }
        })
        .then(function () {
            window.location.href = "/my_page"
        })
        .catch(function (error) {
            console.log(error);
        });
        }
    
        return(
          <form onSubmit={handleSubmit}>
            <input placeholder="Title" type="text" value={title} onChange={handleChangeTitle} />
            <input placeholder="Content" type="text" value={content} onChange={handleChangeContent} />
            <input placeholder="Categories" type="text" value={categories} onChange={handleChangeCategories} />
            <input type="submit" value="Create" />
          </form>
        );
    }

    
}
