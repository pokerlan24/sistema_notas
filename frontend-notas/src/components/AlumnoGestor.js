import React, { useEffect, useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AlumnoService from '../services/AlumnoService';
import './AlumnoGestor.css'; // Asegúrate de tener los estilos

const AlumnoGestor = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [edad, setEdad] = useState('');
  const [editando, setEditando] = useState(false);
  const [alumnoId, setAlumnoId] = useState(null);

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const cargarAlumnos = () => {
    AlumnoService.obtenerAlumnos().then((response) => {
      setAlumnos(response.data);
    });
  };

  const guardarAlumno = () => {
    const alumno = { nombre, carrera, edad };
    if (editando) {
      AlumnoService.actualizarAlumno(alumnoId, alumno).then(() => {
        alert('Alumno actualizado con éxito');
        cargarAlumnos();
        limpiarFormulario();
      });
    } else {
      AlumnoService.crearAlumno(alumno).then(() => {
        alert('Alumno agregado con éxito');
        cargarAlumnos();
        limpiarFormulario();
      });
    }
  };

  const eliminarAlumno = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
      AlumnoService.eliminarAlumno(id).then(() => {
        alert('Alumno eliminado con éxito');
        cargarAlumnos();
      });
    }
  };

  const editarAlumno = (alumno) => {
    setEditando(true);
    setAlumnoId(alumno.id);
    setNombre(alumno.nombre);
    setCarrera(alumno.carrera);
    setEdad(alumno.edad);
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCarrera('');
    setEdad('');
    setEditando(false);
    setAlumnoId(null);
  };

  const handleEdadChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setEdad(value);
    } else {
      alert('Solo se permiten números para la edad.');
    }
  };

  return (
    <div className="alumno-gestor-container">
      <h2>Gestión de Alumnos</h2>
      <form noValidate autoComplete="off">
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Carrera"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Edad"
          value={edad}
          onChange={handleEdadChange} // Asegúrate de validar la edad aquí
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={guardarAlumno}>
          {editando ? 'Actualizar Alumno' : 'Agregar Alumno'}
        </Button>
        {editando && (
          <Button variant="outlined" onClick={limpiarFormulario} style={{ marginLeft: '10px' }}>
            Cancelar
          </Button>
        )}
      </form>

      <h3>Listado de Alumnos</h3>
      <div className="table-container">
        <Table className="responsive-table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Carrera</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.id}>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.carrera}</TableCell>
                <TableCell>{alumno.edad}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editarAlumno(alumno)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => eliminarAlumno(alumno.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AlumnoGestor;
