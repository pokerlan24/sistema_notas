import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AlumnoGestor from './components/AlumnoGestor';
import NotaGestor from './components/NotaGestor';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Ruta principal redirige al Gestor de Alumnos */}
        <Route path="/" element={<AlumnoGestor />} />
        <Route path="/alumnos" element={<AlumnoGestor />} />
        <Route path="/notas" element={<NotaGestor />} />
      </Routes>
    </Router>
  );
}

export default App;
