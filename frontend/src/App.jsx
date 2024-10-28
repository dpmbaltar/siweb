import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { faHouse, faPaw } from '@fortawesome/free-solid-svg-icons';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import DetailsPost from './pages/DetailsPost';

import Callback from './components/login/Callback';
import Navbar from './components/navbar/Navbar';

const navArrayLinks = [
  {
    title: 'Principal',
    path: '/',
    icon: faHouse,
  },
  {
    title: 'Publicaciones',
    path: '/publicaciones',
    icon: faPaw,
  },
  {
    title: 'Perfil',
    path: '/perfil',
    icon: faPaw,
  },
];

export default function App() {
  return (
    <>
      <Navbar navArrayLinks={navArrayLinks} />
      <Container maxWidth='sm'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/callback' element={<Callback />} />
          <Route path='/publicaciones' element={<Posts />} />
          <Route path='/perfil' element={<UserProfile />} />
          <Route path='/perfil/:id' element={<UserProfile />} />
          <Route path='/publicacion/:id' element={<DetailsPost />} />
        </Routes>
      </Container>
    </>
  );
}
