import { useState, useEffect } from 'react';
import { getPublicacionesUsuario } from '../../services/servicioPublicaciones';
import PostCard from '../postCard/PostCard';
import { Skeleton } from '@mui/material';

export default function UserPosts({ idUsuario, nombreUsuario }) {
  const autor = nombreUsuario.split(' ')[0]
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPublicacionesUsuario(idUsuario)
    .then((posts) => {
      setPosts(posts);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  if (posts.length == 0) {
    return (
      <>
        <h2 className='open-sans-title'>Publicaciones de {autor}</h2>
        <Skeleton variant="rounded" width={"100%"} height={300} />
      </>
    );
  }

  return (
    <>
      <h2 className='open-sans-title'>Publicaciones de {autor}</h2>
      {posts.map((item) => (
        <PostCard key={item.id} datosPublicacion={item} />
      ))}
    </>
  );
}
