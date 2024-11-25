import api from './api';
import { getToken } from './servicioAutenticacion';

export const getPublicaciones = async () => {
  const response = await api.get('/publicaciones/');
  return response.data;
};

export const getPublicacionesUsuario = async (idUsuario) => {
  const response = await api.get(`/publicaciones/usuario/${idUsuario}`);
  return response.data;
};

export const postPublicaciones = async (nuevaPublicacion) => {
  const token = getToken();
  const response = await api.post('/publicaciones/', nuevaPublicacion, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  return response.data;
};

export const putPublicacion = async (idPublicacion, datosPublicacion) => {
  const token = getToken();
  const response = await api.put(`/publicaciones/${idPublicacion}`, datosPublicacion, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  return response.data;
};

export const deletePublicacion = async (idPublicacion) => {
  const token = getToken();
  const response = await api.delete(`/publicaciones/${idPublicacion}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });

  return response.data;
};
