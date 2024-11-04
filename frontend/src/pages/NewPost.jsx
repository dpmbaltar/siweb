import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Divider, FormHelperText, Paper, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import InputFileUpload from "../components/file/InputFileUpload";
import LocationSelectMap from "../components/map/LocationSelectMap";

import { postArchivo, linkArchivo } from '../services/servicioArchivos';
import { getInfo } from '../services/servicioAutenticacion';
import { postPublicaciones } from '../services/servicioPublicaciones';

const Img = styled('img')({
  width: '100%',
  height: '100%',
  flex: 1,
  objectFit: 'fill',
  objectPosition: 'center',
});

export default function NewPost() {
  const navigate = useNavigate();

  const [errorTitulo, setErrorTitulo] = useState({});
  const [errorContenido, setErrorContenido] = useState({});
  const [errorTelContacto, setErrorTelContacto] = useState({});
  const [errorArea, setErrorArea] = useState({});
  const [errorArchivo, setErrorArchivo] = useState({});
  const [errorNombreMascota, setErrorNombreMascota] = useState({});
  const [errorFechaNacMascota, setErrorFechaNacMascota] = useState({});

  const [location, setLocation] = useState({ lat: '', lng: '' });
  const [fileUpload, setFileUpload] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    tel_contacto: '',
    area_lat: 0,
    area_lng: 0,
    id_archivo: 0,
    id_mascota: 0,
    id_usuario: getInfo().id,
    mascota_nombre: '',
    mascota_fecha_nacimiento: '',
  });

  // Validar los datos del formulario
  const validateFormData = (data) => {
    let isValid = true;

    if (data.titulo.trim() == '') {
      setErrorTitulo({ error: true, helperText: 'Ingresar un titulo' });
      isValid = false;
    } else setErrorTitulo({});

    if (data.contenido.trim() == '') {
      setErrorContenido({ error: true, helperText: 'Ingresar algunos detalles' });
      isValid = false;
    } else setErrorContenido({});

    if (data.tel_contacto.trim() == '') {
      setErrorTelContacto({ error: true, helperText: 'Ingresar telefono de contacto' });
      isValid = false;
    } else setErrorTelContacto({});

    if (data.area_lat == 0 || data.area_lng == 0) {
      setErrorArea({ error: true, helperText: 'Debe seleccionar una ubicación aproximada' });
      isValid = false;
    } else setErrorArea({});

    if (data.id_archivo == 0) {
      setErrorArchivo({ error: true, helperText: 'Debe seleccionar una foto' });
      isValid = false;
    } else setErrorArchivo({});

    if (data.mascota_nombre.trim() == '') {
      setErrorNombreMascota({ error: true, helperText: 'Ingresar nombre de mascota' });
      isValid = false;
    } else setErrorNombreMascota({});

    if (data.mascota_fecha_nacimiento.trim() == '') {
      setErrorFechaNacMascota({ error: true, helperText: 'Ingresar fecha de nacimiento de la mascota' });
      isValid = false;
    } else setErrorFechaNacMascota({});

    return isValid;
  };

  // Establece las coordenadas de ubicación marcada en el mapa
  const handleLocationSelect = (coords) => {
    setLocation(coords);
  };

  // Establece los archivos de imagen a subir
  const handleFileSelect = (file) => {
    if (!file) {
      alert('Por favor, seleccionar una foto.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    postArchivo(file)
      .then((archivo) => {
        setFileUpload(archivo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Ejecuta el POST /publicaciones con los datos del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      area_lat: location.lat,
      area_lng: location.lng,
      id_archivo: fileUpload ? fileUpload.id : 0,
    }));
    console.log('Form data:', formData);

    if (!validateFormData(formData))
      return;

    postPublicaciones(formData)
      .then((nuevaPublicacion) => {
        console.log(nuevaPublicacion);
        navigate(`/publicacion/${nuevaPublicacion.id}`, {
          state: { datosPublicacion: nuevaPublicacion },
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1 className="open-sans-title">Crear publicación</h1>

      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { mb: 1, maxWidth: '100%' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Card>
          <CardContent>
            <h4 className='open-sans-title'>Datos de la publicación</h4>
            <TextField
              id="titulo"
              name="titulo"
              label="Título"
              placeholder="Título que llame la atención"
              variant="filled"
              fullWidth
              required
              onChange={handleChange}
              {...errorTitulo}
            />
            <TextField
              id="contenido"
              name="contenido"
              label="Detalles"
              placeholder="Datos importantes"
              variant="filled"
              rows={4}
              fullWidth
              multiline
              required
              onChange={handleChange}
              {...errorContenido}
            />
            <TextField
              id="tel_contacto"
              name="tel_contacto"
              label="Contacto"
              placeholder="Número de teléfono de contacto"
              variant="filled"
              type="tel"
              fullWidth
              required
              onChange={handleChange}
              {...errorTelContacto}
            />

            <h4 className='open-sans-title'>Datos de la mascota</h4>
            <Grid container spacing={2} style={{ marginTop: 16 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="mascota_nombre"
                  name="mascota_nombre"
                  label="Nombre"
                  placeholder="Nombre de la mascota"
                  variant="filled"
                  fullWidth
                  required
                  onChange={handleChange}
                  {...errorNombreMascota}
                  />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  id="mascota_fecha_nacimiento"
                  name="mascota_fecha_nacimiento"
                  label="Fecha de nacimiento"
                  variant="filled"
                  type="date"
                  fullWidth
                  required
                  onChange={handleChange}
                  {...errorFechaNacMascota}
                  />
              </Grid>
            </Grid>

            <h4 className='open-sans-title'>Zona aproximada</h4>
            <LocationSelectMap onLocationSelect={handleLocationSelect} />
            {errorArea ? <FormHelperText error>{errorArea.helperText}</FormHelperText> : ''}

            <h4 className='open-sans-title'>Foto de la publicación</h4>
            <Grid container spacing={2} style={{ marginTop: 16 }}>
              <Grid size={12}>
                <InputFileUpload
                  onFileSelect={handleFileSelect}
                  label="Seleccionar foto"
                  icon={<FontAwesomeIcon icon={faImage} />}
                />
              </Grid>
              <Grid size={12}>
                <Paper elevation={2}>
                  {fileUpload ?
                    <Img src={fileUpload ? linkArchivo(fileUpload.id) : ''} alt="Foto seleccionada" /> :
                    <FormHelperText error>No ha seleccionado una foto...</FormHelperText>}
                </Paper>
              </Grid>
            </Grid>

            <Divider />

            <Grid container spacing={2} style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                type="submit"
                startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
              >
                Crear publicación
              </Button>
            </Grid>

          </CardContent>
        </Card>
      </Box>
    </>
  );
}
