import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './Posts';
import Pagination from './Pagination';

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:8000/api/posts');
        setPosts(res.data);
        setLoading(false);
      };
  
      fetchPosts();
    }, []);
  
    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
  <div>

  <h1>All posts</h1>
  <Posts posts={currentPosts} loading={loading} />
  <Pagination
    postsPerPage={postsPerPage}
    totalPosts={posts.length}
    paginate={paginate}
  />
</div>)
}
