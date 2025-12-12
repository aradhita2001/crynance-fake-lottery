import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';
import Registration from './pages/Registration';
import Scratch from './pages/Scratch';
import './App.css';
import Logo from './assets/logo.svg';

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <img src={Logo} alt="Crynance" style={{ height: 36, marginRight: 12 }} />
          <Typography variant="h6" component="div">
            Crynance Giveaway
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/scratch" element={<Scratch />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
