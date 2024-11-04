import { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import UserPosts from '../components/profile/UserPosts';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(token);
      setUser(user);
      setUserInfo(user.userinfo);
    }
  }, []);

  if (!user) {
    return (
      <>
        <h1 className='open-sans-title'>Perfil del usuario</h1>
        <div className='open-sans-text'>Por favor, inicie sesión para ver su información.</div>
      </>
    );
  }

  return (
    <>
      <h1 className='open-sans-title'>Perfil del usuario</h1>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size="auto">
              <Avatar
                alt={userInfo.given_name}
                src={userInfo.picture}
                sx={{ width: 56, height: 56 }}
                />
            </Grid>
            <Grid size="grow">
              <p className='open-sans-title'>
                {userInfo.nickname}
              </p>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: 16 }}>
            <Grid size={{ xs: 4, sm: "auto" }}>
              <p className='open-sans-text'><b>Nombre:</b></p>
            </Grid>
            <Grid size={{ xs: 8, sm: "grow" }}>
              <p className='open-sans-text'>{userInfo.given_name}</p>
            </Grid>
            <Grid size={{ xs: 4, sm: "auto" }}>
              <p className='open-sans-text'><b>Apellido:</b></p>
            </Grid>
            <Grid size={{ xs: 8, sm: "grow" }}>
              <p className='open-sans-text'>{userInfo.family_name}</p>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            href="/publicacion/nueva"
            startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
            >
            Crear publicación
          </Button>
        </CardContent>
      </Card>

      <UserPosts idUsuario={user.id} nombreUsuario={userInfo.given_name} />
    </>
  );
}
