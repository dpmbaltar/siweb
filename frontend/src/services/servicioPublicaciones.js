import api from './api';
import { getInfo } from './servicioAutenticacion';

export const getPublicaciones = async () => {
  const response = await api.get('/publicaciones');
  return response.data;
};

export const getPublicacionesUsuario = async (idUsuario) => {
  const response = await api.get(`/publicaciones/usuario/${idUsuario}`);
  return response.data;
};

export const postPublicaciones = async (nuevaPublicacion) => {
  const token = getInfo()?.id_token;
  const response = await api.post('/publicaciones/', nuevaPublicacion, {
    withCredentials: true,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  return response.data;
};

export const putPublicacion = async (idPublicacion) => {
  return {};
};

export const deletePublicacion = async (idPublicacion) => {
  return {};
};

export const postPublicacion = async (idPublicacion) => {
  return {};
};
