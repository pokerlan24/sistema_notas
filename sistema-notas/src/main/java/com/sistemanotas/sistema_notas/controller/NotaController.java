package com.sistemanotas.sistema_notas.controller;

import com.sistemanotas.sistema_notas.model.Nota;
import com.sistemanotas.sistema_notas.service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotaController {

    @Autowired
    private NotaService notaService;

    // Obtener todas las notas
    @GetMapping
    public List<Nota> obtenerTodasLasNotas() {
        return notaService.obtenerTodasLasNotas();
    }

    // Crear o asignar una nueva nota a un alumno
    @PostMapping("/alumno/{alumnoId}")
    public Nota crearNotaParaAlumno(@PathVariable Long alumnoId, @RequestBody Nota nota) {
        return notaService.guardarNotaParaAlumno(alumnoId, nota);
    }

    // Editar una nota existente de un alumno
    @PutMapping("/alumno/{alumnoId}")
    public Nota actualizarNotaParaAlumno(@PathVariable Long alumnoId, @RequestBody Nota nota) {
        return notaService.actualizarNotaParaAlumno(alumnoId, nota);
    }

    // Obtener una nota por su ID
    @GetMapping("/{id}")
    public Nota obtenerNotaPorId(@PathVariable Long id) {
        return notaService.obtenerNotaPorId(id);
    }

    // Eliminar una nota por su ID
    @DeleteMapping("/{id}")
    public void eliminarNota(@PathVariable Long id) {
        notaService.eliminarNota(id);
    }
}
