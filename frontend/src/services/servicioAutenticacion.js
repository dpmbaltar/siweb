import api from './api';

export const getInfo = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const user = JSON.parse(token);
    return user;
  }

  return null;
};

export const getToken = () => {
  return getInfo()?.id_token;
};
