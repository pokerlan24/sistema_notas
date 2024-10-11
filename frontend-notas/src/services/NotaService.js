import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notas';

const obtenerNotasDeAlumnos = () => {
  return axios.get(API_URL);
};

const guardarNota = (alumnoId, nota) => {
  return axios.post(`${API_URL}/alumno/${alumnoId}`, nota);
};

const editarNota = (alumnoId, nota) => {
  return axios.put(`${API_URL}/alumno/${alumnoId}`, nota);
};

const eliminarNota = (notaId) => { 
  return axios.delete(`${API_URL}/${notaId}`);
};

const NotaService = {
  obtenerNotasDeAlumnos,
  guardarNota,
  editarNota,
  eliminarNota,
};

export default NotaService;
