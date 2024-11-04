import api from './api';

export const getUsuario = async (idUsuario) => {
  const response = await api.get(`/usuarios/${idUsuario}`);
  return response.data;
};
