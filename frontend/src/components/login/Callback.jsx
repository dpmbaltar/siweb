import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

async function fetchToken() {
  const response = await fetch('http://localhost:5000/autenticacion/info', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
  const data = await response.text();

  return data;
}

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    fetchToken().then((token) => {
      localStorage.setItem('token', token);
      navigate('/');
    }).catch(error => {
      console.error('Error al obtener token', error);
    });
  }, [navigate]);

  return (
    <>
      <Card>
        <CardContent>
          <p className='open-sans-text'>Cargando...</p>
        </CardContent>
      </Card>
    </>
  );
}
