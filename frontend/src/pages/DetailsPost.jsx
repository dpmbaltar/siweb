import { Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import UserAvatar from '../components/userAvatar/UserAvatar';
import CustomMap from '../components/customMap/CustomMap';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  //maxWidth: 400,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  overflow: 'hidden',
}));

const Img = styled('img')({
  width: '100%',
  height: '100%',
  flex: 1,
  objectFit: 'fill',
  objectPosition: 'center',
});

export default function DetailsPost() {
  let { state } = useLocation();
  const post = state.datosPublicacion;
  const { usuario, mascotas, archivos } = post;

  return (
    <>
      <h2 className='open-sans-title'>Detalles de la publicación</h2>
      <Item sx={{ mx: 'auto', p: 2 }}>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', pb: 2 }}>
          <UserAvatar usuario={usuario} />
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Typography>
              {usuario.nombre}{' '}
              {usuario.apellido}
            </Typography>
          </Stack>
        </Stack>
        <Img src={`http://localhost:5000/archivos/${archivos[0].id}`} alt='mascota' />
        <Typography component='div' variant='body1' textAlign={'left'}>
          <Typography variant='h6'>Detalles</Typography>
          <Divider />
          <div>
            <p>{post.contenido}</p>
            <h4>Contacto</h4>
            <Chip
              label={post.tel_contacto}
              variant="outlined"
              component="a"
              href={`tel:${post.tel_contacto}`}
              clickable
              />
            <h4>Mascotas</h4>
            {mascotas.map((mascota) => (
              <Chip key={mascota.id} label={mascota.nombre} />
            ))}
            <h4>Lugar aproximado</h4>
          </div>
        </Typography>
        <Divider />

        <CustomMap
          lat={post.area_lat}
          lng={post.area_lng}
          />
      </Item>
    </>
  );
}
