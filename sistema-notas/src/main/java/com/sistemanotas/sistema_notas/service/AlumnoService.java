package com.sistemanotas.sistema_notas.service;

import com.sistemanotas.sistema_notas.model.Alumno;
import com.sistemanotas.sistema_notas.repository.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository alumnoRepository;

    // Obtener todos los alumnos
    public List<Alumno> obtenerTodosLosAlumnos() {
        return alumnoRepository.findAll();
    }

    // Obtener todos los alumnos junto con sus notas
    public List<Alumno> obtenerAlumnosConNotas() {
        return alumnoRepository.findAll();  // Hibernate cargará automáticamente las notas si se han mapeado correctamente
    }

    // Guardar un nuevo alumno o actualizar uno existente
    public Alumno guardarAlumno(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    // Obtener un alumno por su ID
    public Alumno obtenerAlumnoPorId(Long id) {
        return alumnoRepository.findById(id).orElse(null);
    }

    // Eliminar un alumno por su ID
    public void eliminarAlumno(Long id) {
        alumnoRepository.deleteById(id);
    }
}
