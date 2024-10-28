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
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import UserAvatar from '../userAvatar/UserAvatar';

export default function PostCard({ datosPublicacion }) {
  const navigate = useNavigate();

  const handleDetailsPost = () => {
    navigate(`/publicacion/${datosPublicacion.id}`, {
      state: { datosPublicacion },
    });
  };

  return (
    <Card
      raised
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
          avatar={<UserAvatar usuario={datosPublicacion.usuario} />}
          title={
            datosPublicacion.usuario.nombre +
            ' ' +
            datosPublicacion.usuario.apellido
          }
          subheader={datosPublicacion.fecha_creado}
        />

        <CardMedia
          component='img'
          image='https://via.placeholder.com/1000x200'
          height='200'
          alt='Card Image'
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {datosPublicacion.titulo}
          </Typography>
          <Typography variant='body2'>{datosPublicacion.contenido}</Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button
          color='secondary'
          size='small'
          variant='contained'
          onClick={handleDetailsPost}
          fullWidth
          endIcon={
            <FontAwesomeIcon size='xs' icon={faArrowUpRightFromSquare} />
          }
          sx={{ borderRadius: 4 }}
        >
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}
