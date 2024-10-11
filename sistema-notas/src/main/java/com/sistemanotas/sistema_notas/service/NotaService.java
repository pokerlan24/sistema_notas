package com.sistemanotas.sistema_notas.service;

import com.sistemanotas.sistema_notas.model.Alumno;
import com.sistemanotas.sistema_notas.model.Nota;
import com.sistemanotas.sistema_notas.repository.AlumnoRepository;
import com.sistemanotas.sistema_notas.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotaService {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    // Obtener todas las notas
    public List<Nota> obtenerTodasLasNotas() {
        return notaRepository.findAll();
    }

    // Crear o asignar una nueva nota para un alumno
    public Nota guardarNotaParaAlumno(Long alumnoId, Nota nota) {
        Optional<Alumno> alumnoOpt = alumnoRepository.findById(alumnoId);
        if (alumnoOpt.isPresent()) {
            Alumno alumno = alumnoOpt.get();
            nota.setAlumno(alumno);
            nota.setTotal(calcularTotal(nota)); // Calcula el total automáticamente
            return notaRepository.save(nota);
        } else {
            throw new RuntimeException("Alumno no encontrado con ID: " + alumnoId);
        }
    }

    // Editar una nota existente de un alumno
    public Nota actualizarNotaParaAlumno(Long alumnoId, Nota notaActualizada) {
        Optional<Alumno> alumnoOpt = alumnoRepository.findById(alumnoId);
        if (alumnoOpt.isPresent()) {
            Alumno alumno = alumnoOpt.get();
            Nota notaExistente = notaRepository.findById(notaActualizada.getId())
                    .orElseThrow(() -> new RuntimeException("Nota no encontrada con ID: " + notaActualizada.getId()));
            notaExistente.setActividad(notaActualizada.getActividad());
            notaExistente.setPrimerParcial(notaActualizada.getPrimerParcial());
            notaExistente.setSegundoParcial(notaActualizada.getSegundoParcial());
            notaExistente.setExamenFinal(notaActualizada.getExamenFinal());
            notaExistente.setTotal(calcularTotal(notaExistente)); // Calcula el total
            notaExistente.setAlumno(alumno);
            return notaRepository.save(notaExistente);
        } else {
            throw new RuntimeException("Alumno no encontrado con ID: " + alumnoId);
        }
    }

    // Obtener una nota por su ID
    public Nota obtenerNotaPorId(Long id) {
        return notaRepository.findById(id).orElseThrow(() -> new RuntimeException("Nota no encontrada con ID: " + id));
    }

    // Eliminar una nota por su ID
    // Eliminar una nota por su ID
    public void eliminarNota(Long id) {
        Nota nota = notaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nota no encontrada con ID: " + id));
        notaRepository.delete(nota);
    }

    // Método para calcular el total de una nota
    private int calcularTotal(Nota nota) {
        return nota.getActividad() + nota.getPrimerParcial() + nota.getSegundoParcial() + nota.getExamenFinal();
    }
}
