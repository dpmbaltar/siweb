import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { faHouse, faCircleUser } from '@fortawesome/free-solid-svg-icons';

import Posts from './pages/Posts';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import DetailsPost from './pages/DetailsPost';
import NewPost from './pages/NewPost';

import Callback from './components/login/Callback';
import Navbar from './components/navbar/Navbar';

const navArrayLinks = [
  {
    title: 'Principal',
    path: '/',
    icon: faHouse,
  },
  {
    title: 'Perfil',
    path: '/perfil',
    icon: faCircleUser,
  },
];

export default function App() {
  return (
    <>
      <Navbar navArrayLinks={navArrayLinks} />
      <Container maxWidth='sm'>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/login' element={<Login />} />
          <Route path='/callback' element={<Callback />} />
          <Route path='/publicaciones' element={<Posts />} />
          <Route path='/perfil' element={<UserProfile />} />
          <Route path='/perfil/:id' element={<UserProfile />} />
          <Route path='/publicacion/:id' element={<DetailsPost />} />
          <Route path='/publicacion/nueva' element={<NewPost />} />
        </Routes>
      </Container>
    </>
  );
}
