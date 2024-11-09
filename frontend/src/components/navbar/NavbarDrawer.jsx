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
                style={({ isActive }) =>
                  isActive ? { color: '#387478' } : { color: 'black' }
                }
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={item.icon} color='#387478' />
                </ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
