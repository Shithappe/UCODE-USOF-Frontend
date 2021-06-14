import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import Select from 'react-select';
import './CreatePost.css';


export default function CreatePost(post) {
  console.log(post)
  let update = true;
    if (!post.post) {
      update = false
      const post = {
        title: '',
        content: ''
      }
    }
      else post = {
        post_id: post.post.id,
        title: post.post.title,
        content: post.post.content
      }

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [categories, setCategories] = useState({});
    const [categories1, setCategories1] = useState([]);

    useEffect(() => {
      axios({
        method: 'get',
        url: "http://127.0.0.1:8000/api/categories/"
      })
      .then(function (response) {
        setCategories1(response.data.map((categ) => {
          return {value: categ.id, label: categ.title}
      }))
        setCategories(response.data)
      })
      .catch(function (error) { console.log(error); });

    }, [])


    if (Cookie.get("token") === undefined) window.location.href = "/login";
    else{
        
        const handleChangeTitle = e => {setTitle(e.target.value);}
        const handleChangeContent = e => {setContent(e.target.value);}

        function conv(categories){
          const cat = { "id": categories.map((act)=>act.value) }
          return JSON.stringify(cat)
        }
    
        const handleSubmit = (e) => {
          e.preventDefault();
          
          console.log(post.post_id,title, content, conv(categories))
        !update ?
        axios({
          method: 'post',
          url: "http://127.0.0.1:8000/api/posts",
          headers: { 'Authorization': 'Bearer ' + Cookie.get("token")},
          data: {
            title: title,
            content: content,
            categories: conv(categories)
          }
          })
          .then(function (res) {              window.location.href = "/post/"+res.data.id;          })
          .catch(function (error) {            console.log(error);          })
        :
        axios({
          method: 'patch',
          url: "http://127.0.0.1:8000/api/posts/" + post.post_id,
          headers: { 'Authorization': 'Bearer ' + Cookie.get("token")},
          data: {
            title: title,
            content: content,
            categories: conv(categories)
          }
          })
          .then(function (res) {              window.location.href = "/post/"+res.data.id;          })
          .catch(function (error) {            console.log(error);          })        
        }

        return(
          <div>
           {update ? <h1>Update post</h1> : <h1>Create post</h1>} 
          
          <form className='CreatePost' onSubmit={handleSubmit}>
            <span>Title</span>
            <input required placeholder="Title" type="text" value={title} onChange={handleChangeTitle} />
            <span>Content</span>
            <textarea rows="6" cols="80" value={content} onChange={handleChangeContent}></textarea>
            <span>Categories</span>
            <Select 
              options={categories1} 
              isMulti
              onChange={setCategories}
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: 'rgba(0, 0, 0, 0.1);',
                  primary: 'black',
                },
              })}
            />
            {update ? <input type="submit" value="Update" /> : <input type="submit" value="Create" />}
          </form>
          </div>
        );
    }
}
