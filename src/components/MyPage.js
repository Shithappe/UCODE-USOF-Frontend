import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import './MyPage.css'
import ImageUser from '../Assets/user-astronaut-solid.svg'
import Like from '../Assets/heart-solid.svg'


export default function MyPage ( {id} ) {
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')
  const [passwordC, setPasswordC] = useState('')
  const [edit, setEdit] = useState(false)

  const [posts, setPost] = useState([])

    if (Cookie.get("token") === undefined) window.location.href = "/login";
 
      useEffect(() => {
        axios({
          method: 'get',
          url: "http://127.0.0.1:8000/api/users/"+id,
          headers: { 'Authorization': 'Bearer ' + Cookie.get("token")}
        })
        .then(function (response) {
          setName(response.data.name)
          setLogin(response.data.login)
          setEmail(response.data.email)
          setRating(response.data.rating)
          setRole(response.data.role)
          })
        .catch(function (error) {
          console.log(error);
        });

        axios({
          method: 'get',
          url: "http://127.0.0.1:8000/api/user_posts/"+id,
          headers: { 'Authorization': 'Bearer ' + Cookie.get("token")}
        })
        .then(function (response) {
          setPost(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }, [])


    const handleChangeName = e => {     setName(e.target.value);     }
    const handleChangeLogin = e => {    setLogin(e.target.value);    }
    const handleChangeEmail = e => {    setEmail(e.target.value);    }
    const handleChangePassword = e => { setPassword(e.target.value); }
    const handleChangePasswordC = e => { setPasswordC(e.target.value);}

    const handleSubmit = (e) => {
      if (password != passwordC) {alert("Incorect input password"); return;}
      e.preventDefault();
      
    axios({
      method: 'patch',
      url: "http://127.0.0.1:8000/api/users/" + Cookie.get('userId'),
      headers: {        'Authorization': 'Bearer ' + Cookie.get("token")        },
      data: {
        name: name,
        login: login,
        email: email,
        password_confirmation: password
      }
    })
    .then(function (response) { Cookie.set('userLogin', response.data.login);
                              
                                if (password !== '') {
                                  axios({
                                    method: 'post',
                                    url: "http://127.0.0.1:8000/api/auth/reset_pass",
                                    headers: { 'Authorization': 'Bearer ' + Cookie.get("token") },
                                    data: {
                                      email: email,
                                      password: password
                                    }
                                  })
                                  .catch(function (error) { console.log(error); });
                                }
                              
                                window.location.reload();   
                              
                              })
    .catch(function (error) { alert("Login or email already uses");  console.log(error);    });
  }

      function Edit_user_data(){
        setEdit(true)
        return(
          <div className="Edit">
            <form onSubmit={handleSubmit}>

              <div><span>Name</span> <br/>
              <input placeholder="Name" value={name} onChange={handleChangeName} />
              </div><br/>

              <div><span>Login</span> <br/>
              <input placeholder="Login" value={login} onChange={handleChangeLogin} />
              </div><br/>
              
              <div><span>Email</span> <br/>
              <input placeholder="Email" type="email" value={email} onChange={handleChangeEmail} />
              </div><br/>

              <div><span>Password</span> <br/>
              <input id='p' placeholder="Password" type="password" value={password} onChange={handleChangePassword} />
              <input placeholder="Confirmation password" type="password" value={passwordC} onChange={handleChangePasswordC} />
              </div><br/>
              {/* {if ((password == '') && (password != passwordC)) { document.getElementById("Edit").setAttribute('disabled', true)}} */}
              <input type="submit" value="Edit" />
            </form>
          </div>
        )
      }

    function Show_user_data(){
      return(
        <div>
              <div>
              <div><span>Name</span> <br/>
              <span >{name}</span>
              </div>
              <br/>

              <div><span>Login</span> <br/>
              <span >{login}</span>
              </div>
              <br/>

              <div>
              <span>Email</span> <br/>
              <span >{email}</span>
              </div>
              </div>
              <br/>
              {id == Cookie.get("userId") ? <button onClick={()=>setEdit(true)}>Edit</button>:<br/>}
          </div>
      )
    }




    return (
        <div className='main'>
          <div></div>
          <br/>
          <div className="userInfo">
        <img src={ImageUser} alt=""/>
        <div>
          <span >{role}</span>
          <span id='rating'>{rating}</span>
          <hr/>
          </div>
            {edit ? <Edit_user_data /> : <Show_user_data />}
          </div>




          <div className="userPost">
            {posts.length == 0 ? <h2>No posts</h2> : 
              <ul className="posts">
                {posts?.map(post => (
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
            } 
          </div>

         </div>
    )
}
