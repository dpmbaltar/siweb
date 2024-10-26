import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import NavbarDrawer from './NavbarDrawer';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faPaw,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

const navLinks = [
  {
    title: 'Principal',
    path: '#',
    icon: faHouse,
  },
  {
    title: 'Publicaciones',
    path: '#posts',
    icon: faPaw,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            color='inherit'
            size='large'
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            RescatAr
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navLinks.map((item) => (
              <Button
                color='inherit'
                key={item.title}
                component='a'
                href={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Button
            variant='outlined'
            color='inherit'
            startIcon={<FontAwesomeIcon icon={faCircleUser} />}
            sx={{
              borderRadius: 10,
              textTransform: 'capitalize',
            }}
          >
            Acceder
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor='left'
        onClose={() => setOpen(false)}
        sx={{ display: { xs: 'flex', sm: 'none' } }}
      >
        <NavbarDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
}
