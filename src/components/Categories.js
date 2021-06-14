import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import './Categories.css'

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios({
          method: 'get',
          url: "http://127.0.0.1:8000/api/categories/"
        })
        .then(function (response) {
            setCategories(response.data)
            console.log(categories)
        })
        .catch(function (error) {
            console.log(error);
          });
    }, [])


    return (
        <div>
            <h1 className='AllPosts'>All category</h1>

            <ul className="category">
            {categories?.map(category => (
                <li key={category.id} onClick={e=>window.location.href = "/category/"+category.id}>
                    <h2>{category.title}</h2>
                    <hr/>
                    <p>{category.description}</p>
                </li>
            ))}
        </ul>
        </div>
    )
}
