package com.sistemanotas.sistema_notas.controller;

import com.sistemanotas.sistema_notas.model.Alumno;
import com.sistemanotas.sistema_notas.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    // Obtener todos los alumnos
    @GetMapping
    public List<Alumno> obtenerTodosLosAlumnos() {
        return alumnoService.obtenerTodosLosAlumnos();
    }

    // Obtener todos los alumnos con sus notas
    @GetMapping("/notas")
    public List<Alumno> obtenerAlumnosConNotas() {
        return alumnoService.obtenerAlumnosConNotas();  // Servicio que debe cargar alumnos con sus notas
    }

    // Crear un nuevo alumno
    @PostMapping
    public Alumno crearAlumno(@RequestBody Alumno alumno) {
        return alumnoService.guardarAlumno(alumno);
    }

    // Obtener un alumno por su ID
    @GetMapping("/{id}")
    public Alumno obtenerAlumnoPorId(@PathVariable Long id) {
        return alumnoService.obtenerAlumnoPorId(id);
    }

    // Actualizar un alumno por su ID
    @PutMapping("/{id}")
    public Alumno actualizarAlumno(@PathVariable Long id, @RequestBody Alumno alumnoActualizado) {
        Alumno alumnoExistente = alumnoService.obtenerAlumnoPorId(id);
        alumnoExistente.setNombre(alumnoActualizado.getNombre());
        alumnoExistente.setCarrera(alumnoActualizado.getCarrera());
        alumnoExistente.setEdad(alumnoActualizado.getEdad());
        return alumnoService.guardarAlumno(alumnoExistente);
    }

    // Eliminar un alumno por su ID
    @DeleteMapping("/{id}")
    public void eliminarAlumno(@PathVariable Long id) {
        alumnoService.eliminarAlumno(id);
    }
}
