import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Notas
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/alumnos">
            Gestión de Alumnos
          </Button>
          <Button color="inherit" component={Link} to="/notas">
            Gestión de Notas
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
