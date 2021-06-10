import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";


export default function Post ({ id }) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [commments, setCommments] = useState([])
    useEffect(() => {
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



    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
            <hr/>
            {commments.map(commment => (
                <li key={commment.id}>
                    {commment.content}
                </li>
            ))}
      <form onSubmit={handleSubmit}>
          <input type="text" value={newComment} onChange={handleChangeComment} />
          <input type="submit" value="Comment" />
      </form>
        </div>
    )
}

