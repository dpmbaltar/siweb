import React, { useState, useEffect } from 'react';
import { getPublicaciones } from '../services/servicioPublicaciones';
import PostCard from '../components/postCard/PostCard';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPublicaciones()
      .then((posts) => {
        setPosts(posts);
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
