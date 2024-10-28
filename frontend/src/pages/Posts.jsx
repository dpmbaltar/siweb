import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostCard from '../components/postCard/PostCard';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/publicaciones/')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='open-sans-text'>
      <h2 className='open-sans-title'>Posts</h2>
      {posts.map((item) => (
        <PostCard key={item.id} datosPublicacion={item} />
      ))}
    </div>
  );
}
