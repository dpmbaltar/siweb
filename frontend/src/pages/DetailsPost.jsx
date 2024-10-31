import { Divider, Paper, Stack, Typography } from '@mui/material';
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
  width: 330,
  height: '100%',
  flex: 1,
  objectFit: 'fill',
  objectPosition: 'center',
});

export default function DetailsPost() {
  let { state } = useLocation();

  return (
    <>
      <h2 className='open-sans-title'>Detalles del post</h2>
      <Item sx={{ mx: 'auto', p: 2 }}>
        <Stack direction='row' spacing={2} sx={{ alignItems: 'center', pb: 2 }}>
          <UserAvatar usuario={state.datosPublicacion.usuario} />
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Typography>
              {state.datosPublicacion.usuario.nombre}{' '}
              {state.datosPublicacion.usuario.apellido}
            </Typography>
          </Stack>
        </Stack>
        <Img src='https://via.placeholder.com/300' alt='mascota' />
        <Typography component='div' variant='body1' textAlign={'left'}>
          <Typography variant='h6'>Datos</Typography>
          <Divider />
          <p><b>Descripción:</b> {state.datosPublicacion.contenido}</p>
          <p><b>Contacto:</b> {state.datosPublicacion.tel_contacto}</p>
          <p><b>Nombre:</b> </p>
          <p><b>Edad:</b> </p>
        </Typography>
        <Divider />

        <CustomMap
          lat={state.datosPublicacion.area_lat}
          lng={state.datosPublicacion.area_lng}
          />
      </Item>
    </>
  );
}
