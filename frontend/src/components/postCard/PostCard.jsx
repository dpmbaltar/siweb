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
import { linkArchivo } from '../../services/servicioArchivos';

export default function PostCard({ datosPublicacion }) {
  const navigate = useNavigate();

  const handleDetailsPost = () => {
    navigate(`/publicacion/${datosPublicacion.id}`, {
      state: { datosPublicacion },
    });
  };

  const usuario = datosPublicacion.usuario;
  const nombreUsuario = `${usuario.nombre} ${usuario.apellido}`;
  const idImagen = datosPublicacion.archivos.length > 0 ? datosPublicacion.archivos[0].id : '';

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
      <CardActionArea onClick={handleDetailsPost}>
        <CardHeader
          avatar={<UserAvatar usuario={usuario} />}
          title={nombreUsuario}
          subheader={datosPublicacion.fecha_creado}
        />

        <CardMedia
          component='img'
          image={linkArchivo(idImagen)}
          height="100%"
          alt={datosPublicacion.titulo}
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='h5'>{datosPublicacion.titulo}</Typography>
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
