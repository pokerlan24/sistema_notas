import axios from 'axios';

const API_URL = 'http://localhost:8080/api/alumnos';

// Obtener todos los alumnos
const obtenerAlumnos = () => {
  return axios.get(API_URL);
};

// Crear un nuevo alumno
const crearAlumno = (alumno) => {
  return axios.post(API_URL, alumno);
};

// Actualizar un alumno existente
const actualizarAlumno = (id, alumno) => {
  return axios.put(`${API_URL}/${id}`, alumno);
};

// Eliminar un alumno por su ID
const eliminarAlumno = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const AlumnoService = {
  obtenerAlumnos,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno,
};

export default AlumnoService;
