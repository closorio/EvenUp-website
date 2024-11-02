import React from 'react';
import { theme } from '../materialUI-common';
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

export const SecondaryListItems= () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Eventos recientes
      </ListSubheader>
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.secondary.main}}}
        onClick={() => navigate('/')}>
        <ListItemIcon>
          <AssignmentIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Mes actual" />
      </ListItemButton>
      <ListItemButton sx={{'&:hover': {backgroundColor: theme.palette.secondary.main}}}
        onClick={() => navigate('/')}>
        <ListItemIcon>
          <AssignmentIcon sx={{color: theme.palette.primary.light}}/>
        </ListItemIcon>
        <ListItemText primary="Último trimestre" />
      </ListItemButton>
    </React.Fragment>
  );
}