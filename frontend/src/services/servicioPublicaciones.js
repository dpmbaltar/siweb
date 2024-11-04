import api from './api';

export const getPublicaciones = async () => {
  const response = await api.get('/publicaciones');
  return response.data;
};

export const getPublicacionesUsuario = async (idUsuario) => {
  const response = await api.get(`/publicaciones/usuario/${idUsuario}`);
  return response.data;
};

export const postPublicaciones = async (nuevaPublicacion) => {
  const response = await api.post('/publicaciones/', nuevaPublicacion, {
    withCredentials: true,
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
