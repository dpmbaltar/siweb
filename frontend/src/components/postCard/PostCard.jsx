import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';

import UserAvatar from '../userAvatar/UserAvatar';

export default function PostCard({
  usuario,
  fechaCreado,
  titulo,
  descripcion,
}) {
  return (
    <Card
      sx={{
        transition: '0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        my: 3,
      }}
    >
      <CardActionArea>
        <CardHeader
          avatar={<UserAvatar usuario={usuario} />}
          title={usuario.nombre + ' ' + usuario.apellido}
          subheader={fechaCreado}
        />

        <CardMedia
          component='img'
          image='https://via.placeholder.com/1000x200'
          height='200'
          alt='Card Image'
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {titulo}
          </Typography>
          <Typography variant='body2'> {descripcion} </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button color='secondary' size='small' variant='contained'>
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}
