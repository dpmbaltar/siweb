import api from './api';

export const postArchivo = async (archivo) => {
  const formData = new FormData();
  formData.append('file', archivo);

  const response = await api.post('/archivos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getArchivo = async (idArchivo) => {
  const response = await api.get(`/archivos/${idArchivo}`);
  return response.data;
};
