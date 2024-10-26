import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { faHouse, faPaw } from '@fortawesome/free-solid-svg-icons';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

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
];

export default function App() {
  return (
    <>
      <Navbar navArrayLinks={navArrayLinks} />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/publicaciones' element={<Posts />} />
          <Route path='/perfil' element={<UserProfile />} />
        </Routes>
      </Container>
    </>
  );
}
