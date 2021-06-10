import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Post ({ id }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    axios.get("http://127.0.0.1:8000/api/post/"+id, { headers: {
        }
          })
          .then(function (response) {
            setTitle(response.data.title)
            setContent(response.data.content)
          })
          .catch(function (error) {
            console.log(error);
          });
    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    )
}

