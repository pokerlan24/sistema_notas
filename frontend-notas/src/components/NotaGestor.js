import React, { useEffect, useState } from 'react';
import { Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotaService from '../services/NotaService';
import AlumnoService from '../services/AlumnoService';
import './NotaGestor.css'; // Archivo CSS para estilos

const NotaGestor = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [editMode, setEditMode] = useState({});

  // Función para obtener los alumnos y sus notas
  const cargarAlumnos = () => {
    AlumnoService.obtenerAlumnos()
      .then((response) => {
        setAlumnos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los alumnos: ", error);
      });
  };

  useEffect(() => {
    cargarAlumnos(); // Cargar los alumnos al montar el componente
  }, []);

  // Validar si solo hay números y borrar cualquier otro carácter
  const handleInputChange = (index, field, value) => {
    const onlyNumbers = value.replace(/\D/g, ''); // Remueve cualquier cosa que no sea un número

    const updatedAlumnos = [...alumnos];
    updatedAlumnos[index].notas = updatedAlumnos[index].notas || [{}];
    updatedAlumnos[index].notas[0] = {
      ...updatedAlumnos[index].notas[0],
      [field]: onlyNumbers,
    };
    setAlumnos(updatedAlumnos);
  };

  const validarCampos = (nota) => {
    if (nota.actividad > 35) {
      alert("El puntaje de Actividades no puede ser mayor a 35 puntos.");
      return false;
    }
    if (nota.primerParcial > 15) {
      alert("El puntaje del Primer Parcial no puede ser mayor a 15 puntos.");
      return false;
    }
    if (nota.segundoParcial > 15) {
      alert("El puntaje del Segundo Parcial no puede ser mayor a 15 puntos.");
      return false;
    }
    if (nota.examenFinal > 35) {
      alert("El puntaje del Examen Final no puede ser mayor a 35 puntos.");
      return false;
    }
    return true;
  };

  const guardarNota = (alumno) => {
    const nota = alumno.notas[0];

    if (!validarCampos(nota)) {
      return;
    }

    if (nota?.id) {
      if (window.confirm("¿Estás seguro de que deseas guardar esta nota?")) {
        NotaService.editarNota(alumno.id, nota)
          .then(() => {
            alert("Nota actualizada con éxito");
            cargarAlumnos();
            setEditMode((prev) => ({ ...prev, [alumno.id]: false }));
          })
          .catch((error) => {
            console.error("Error al actualizar la nota: ", error);
          });
      }
    } else {
      if (window.confirm("¿Estás seguro de que deseas asignar esta nota?")) {
        NotaService.guardarNota(alumno.id, nota)
          .then(() => {
            alert("Nota creada con éxito");
            cargarAlumnos();
          })
          .catch((error) => {
            console.error("Error al crear la nota: ", error);
          });
      }
    }
  };

  const habilitarEdicion = (alumnoId) => {
    setEditMode((prev) => ({ ...prev, [alumnoId]: true }));
  };

  const cancelarEdicion = (alumnoId) => {
    cargarAlumnos();
    setEditMode((prev) => ({ ...prev, [alumnoId]: false }));
  };

  const eliminarNota = (notaId, alumnoId) => {
    if (notaId && window.confirm('¿Estás seguro de eliminar esta nota?')) {
      NotaService.eliminarNota(notaId)
        .then(() => {
          alert(`Nota eliminada con éxito`);
          cargarAlumnos();
        })
        .catch((error) => {
          console.error("Error al eliminar la nota: ", error);
        });
    }
  };

  return (
    <div className="nota-gestor-container">
      <h2>Gestión de Notas</h2>
      {alumnos.length === 0 ? (
        <p>No hay alumnos registrados.</p>
      ) : (
        <div className="table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Actividad</th>
                <th>Primer Parcial</th>
                <th>Segundo Parcial</th>
                <th>Examen Final</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) => (
                <tr key={alumno.id}>
                  <td>{alumno.nombre}</td>
                  <td>
                    <TextField
                      type="text"
                      placeholder={alumno.notas?.[0]?.actividad ? '' : 'Asignar Nota'}
                      value={alumno.notas?.[0]?.actividad || ''}
                      disabled={!editMode[alumno.id] && alumno.notas?.[0]?.id}
                      onChange={(e) => handleInputChange(index, 'actividad', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </td>
                  <td>
                    <TextField
                      type="text"
                      placeholder={alumno.notas?.[0]?.primerParcial ? '' : 'Asignar Nota'}
                      value={alumno.notas?.[0]?.primerParcial || ''}
                      disabled={!editMode[alumno.id] && alumno.notas?.[0]?.id}
                      onChange={(e) => handleInputChange(index, 'primerParcial', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </td>
                  <td>
                    <TextField
                      type="text"
                      placeholder={alumno.notas?.[0]?.segundoParcial ? '' : 'Asignar Nota'}
                      value={alumno.notas?.[0]?.segundoParcial || ''}
                      disabled={!editMode[alumno.id] && alumno.notas?.[0]?.id}
                      onChange={(e) => handleInputChange(index, 'segundoParcial', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </td>
                  <td>
                    <TextField
                      type="text"
                      placeholder={alumno.notas?.[0]?.examenFinal ? '' : 'Asignar Nota'}
                      value={alumno.notas?.[0]?.examenFinal || ''}
                      disabled={!editMode[alumno.id] && alumno.notas?.[0]?.id}
                      onChange={(e) => handleInputChange(index, 'examenFinal', e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                  </td>
                  <td>{alumno.notas?.[0]?.total || ''}</td>
                  <td>
                    {!editMode[alumno.id] && alumno.notas?.[0]?.id ? (
                      <IconButton onClick={() => habilitarEdicion(alumno.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    ) : (
                      <div className="action-buttons">
                        <Button variant="contained" color="primary" onClick={() => guardarNota(alumno)}>
                          Guardar
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => cancelarEdicion(alumno.id)}>
                          Cancelar
                        </Button>
                      </div>
                    )}
                    {alumno.notas?.[0]?.id && (
                      <IconButton onClick={() => eliminarNota(alumno.notas[0].id, alumno.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NotaGestor;
