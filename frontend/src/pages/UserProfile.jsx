import { useState, useEffect } from 'react';

import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const { userinfo } = JSON.parse(token);
      setUserProfile(userinfo); // Parse the profile data
    }
  }, []);

  if (!userProfile) {
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
    alt="Remy Sharp"
    src={userProfile.picture}
    sx={{ width: 56, height: 56 }}
    />
    </Grid>
    <Grid size="grow">
    <p className='open-sans-title'>
    {userProfile.nickname}
    </p>
    </Grid>
    </Grid>
    <Container style={{ marginTop: 20 }}>
    <Grid container spacing={2}>
    <Grid size="auto">
    <p className='open-sans-text'><b>Nombre:</b></p>
    </Grid>
    <Grid size="grow">
    <p className='open-sans-text'>{userProfile.given_name}</p>
    </Grid>
    <Grid size="auto">
    <p className='open-sans-text'><b>Apellido:</b></p>
    </Grid>
    <Grid size="grow">
    <p className='open-sans-text'>{userProfile.family_name}</p>
    </Grid>
    </Grid>
    </Container>
    </CardContent>
    </Card>
    </>
  );
}
