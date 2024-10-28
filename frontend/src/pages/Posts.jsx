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
      <h1 className='open-sans-title'>Posts</h1>
      {posts.map((item) => (
        <PostCard
          key={item.id}
          usuario={item.usuario}
          fechaCreado={item.fecha_creado}
          titulo={item.titulo}
          descripcion={item.contenido}
        />
      ))}
    </div>
  );
}
