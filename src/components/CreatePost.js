import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import Select from 'react-select'


export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
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
        // console.log(response.data)

      })
      .catch(function (error) {
          console.log(error);
      });
      
   
      
    }, [])
    console.log(categories1)

    if (Cookie.get("token") === undefined) window.location.href = "/login";
    else{
        
        const handleChangeTitle = e => {setTitle(e.target.value);}
        const handleChangeContent = e => {setContent(e.target.value);}
        const handleChangeCategories = e => {setCategories(e.target.value);}

        function conv(categories){
            alert(categories)
            return categories
        }
    
        const handleSubmit = (e) => {
          e.preventDefault();
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
            <input placeholder="Categories" type="text" onChange={handleChangeCategories} />
            <Select options={categories1} isMulti/>
            <input type="submit" value="Create" />
          </form>
        );
    }
}
