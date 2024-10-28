import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

export default function AuthButton() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar estado de login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token)
      setIsLoggedIn(true);
  }, [navigate]);

  const handleLogin = () => {
    const redirectUri = encodeURIComponent('http://localhost:5173/callback');
    const loginUrl = `http://localhost:5000/autenticacion/login?&redirect_uri=${redirectUri}`;
    window.location.href = loginUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);

    const redirectUri = encodeURIComponent('http://localhost:5173/');
    const logoutUrl = `http://localhost:5000/autenticacion/logout?&redirect_uri=${redirectUri}`;
    window.location.href = logoutUrl;
  };

  return (
    <div>
    {isLoggedIn ? (
      <Button
        variant='outlined'
        color='inherit'
        component={NavLink}
        onClick={handleLogout}
        startIcon={<FontAwesomeIcon icon={faCircleUser} />}
        sx={{
          borderRadius: 10,
          textTransform: 'capitalize',
        }}
        >
        Salir
      </Button>
    ) : (
      <Button
        variant='outlined'
        color='inherit'
        component={NavLink}
        onClick={handleLogin}
        startIcon={<FontAwesomeIcon icon={faCircleUser} />}
        sx={{
          borderRadius: 10,
          textTransform: 'capitalize',
        }}
        >
        Acceder
      </Button>
    )}
    </div>
  );
}
