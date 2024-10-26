import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser } from '@fortawesome/free-solid-svg-icons';

import NavbarDrawer from './NavbarDrawer';

export default function Navbar({ navArrayLinks }) {
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
          <Typography
            variant='h6'
            className='open-sans-title'
            sx={{ flexGrow: 1 }}
          >
            RescatAr
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navArrayLinks.map((item) => (
              <Button
                color='inherit'
                key={item.title}
                component={NavLink}
                to={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Button
            variant='outlined'
            color='inherit'
            component={NavLink}
            to='/login'
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
        <NavbarDrawer
          navArrayLinks={navArrayLinks}
          NavLink={NavLink}
          setOpen={setOpen}
        />
      </Drawer>
    </>
  );
}
