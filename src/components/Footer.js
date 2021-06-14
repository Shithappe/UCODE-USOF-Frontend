import { GithubButton, GithubCount } from "react-social";
import React from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";
import Git from './../Assets/github-brands.svg';

export default function Footer() {
    // url = 
    return (
        <footer>
            <GithubButton url={'https://github.com'} >
        <GithubCount url={'https://github.com'} />
        {" Share " + 'https://github.com'}
      </GithubButton>
            {/* <Link to="git"><img src={Git} /></Link> */}
        </footer>
    )
}
