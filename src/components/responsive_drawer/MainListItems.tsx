import React from 'react';
import { theme } from '../materialUI-common';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MainListItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
        onClick={() => navigate('/')}>
        <ListItemIcon>
          <DashboardIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
  
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/profile')}>
        <ListItemIcon>
          <PersonIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Perfil de usuario" />
      </ListItemButton>
      
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/contacts')}>
        <ListItemIcon>
          <PeopleIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Contactos" />
      </ListItemButton>
  
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/event')}>
        <ListItemIcon>
          <EventIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Crear evento" />
      </ListItemButton>
    
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.primary.main}}}
      onClick={() => navigate('/')}>
        <ListItemIcon>
          <AccountBalanceWalletIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Saldos" />
      </ListItemButton>
    </React.Fragment>
  );
}
