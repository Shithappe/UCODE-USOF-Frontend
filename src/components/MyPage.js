import React from 'react'
import Cookie from "js-cookie";

export default function MyPage() {
    if (Cookie.get("token") === undefined) window.location.href = "/login";
    else
    return (
        <div>
        <h1>My page</h1>
        <img src='https://raw.githubusercontent.com/Shithappe/metaphysical-beast/main/assets/images/stay.jpg' alt=""/>
        <div class="navuserifno2">
          <span >{Cookie.get('userLogin')}</span>
          <span>User</span>
        </div>
        </div>
        

    )
}
