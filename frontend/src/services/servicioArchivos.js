import api from './api';
import { getToken } from './servicioAutenticacion';

export const postArchivo = async (archivo) => {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', archivo);
  const response = await api.post('/archivos/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getArchivo = async (idArchivo) => {
  const response = await api.get(`/archivos/${idArchivo}`);
  return response.data;
};

export const linkArchivo = (idArchivo) => {
  return `http://localhost:5000/archivos/${idArchivo}`;
};
