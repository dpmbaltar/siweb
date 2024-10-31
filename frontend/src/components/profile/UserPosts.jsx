import { useState, useEffect } from 'react';
import { getPublicacionesUsuario } from '../../services/servicioPublicaciones';
import PostCard from '../postCard/PostCard';

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

  return (
    <div className='open-sans-text'>
      <h2 className='open-sans-title'>Publicaciones de {autor}</h2>
      {posts.map((item) => (
        <PostCard key={item.id} datosPublicacion={item} />
      ))}
    </div>
  );
}
