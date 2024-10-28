import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

export default function NavbarDrawer({ navArrayLinks, NavLink, setOpen }) {
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          {navArrayLinks.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={item.icon} />
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
      <Divider />
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to='/perfil/:id'
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faCircleUser} />
              </ListItemIcon>
              <ListItemText>Tú</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
