import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { theme } from '../materialUI-common';
import { Badge, Button, Link, Paper, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems } from './MainListItems';
import { SecondaryListItems } from './SecondaryListItems';
import { useStyles } from './ResponsiveDrawerStyles';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../store/auth/useAuthActions';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.youtube.com/watch?v=_6XzJPyAJDI">
        SLC Budget
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logoutUser } = useAuthActions();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const drawer = (
    <div>
      <Toolbar
        sx={useStyles.toolbarDrawer}
        >
        <img src="src/images/logo-slc.svg" alt="SLC Logo" style={useStyles.logo} />
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#FFF" }}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav" >
        <MainListItems />
        <Divider sx={{ my: 1 }} />
        <SecondaryListItems />
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          color: theme.palette.primary.light,
          backgroundColor: theme.palette.secondary.dark
        }}
      >
        <Toolbar
          sx={{
            pr: '24px',
          }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Página de Inicio
          </Typography>
          <Stack direction="row" spacing={3}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button variant='outlined' onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/**Drawer mobile */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Paper sx={{ backgroundColor: 'black', color: 'white' }}>
              {drawer}
          </Paper>
        </Drawer>
        
        {/**Drawer pc */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            '& .MuiPaper-root': { backgroundColor: 'black', color: 'white' },
            border: '3px solid black'
          }}
          open
        >
          <Paper sx={{ backgroundColor: 'black', color: 'white' }}>
            {drawer}
          </Paper>
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3}}
      >
        <Toolbar />
        <Outlet />
        <Copyright sx={{ pt: 4, color: "white" }} />
      </Box>
    </Box>
  );
}