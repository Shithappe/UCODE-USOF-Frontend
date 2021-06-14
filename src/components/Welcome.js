import React from 'react';
import Categories from './Categories';
import AllPosts from './AllPosts';
import Footer from './Footer';
import styles from './../App.css'; 
import Image from './../div/logo.png'

export default function Welcome() {
    return (
        <div className="Welcome">
            <h1>Welcome</h1>
            <h3>On our website you can get the all info needed. Any questions will be answered as soon as possible. Plenty discussions in commets, tips and advice from all world programmers.</h3>
            <div className="Login">
                <form>
                <h2>Time do It</h2>
                <img src={Image}/>
                <input onClick={e=>window.location.href = "/register"} type='button' value='TRY' />
                </form>
                
            </div>
            <br/>
            <Categories />
            <AllPosts />
            <Footer />
        </div>
    )
}
