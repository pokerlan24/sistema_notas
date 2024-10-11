package com.sistemanotas.sistema_notas.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "alumnos")
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "carrera", nullable = false)
    private String carrera;

    @Column(name = "edad", nullable = false)
    private int edad;

    // Relación de uno a muchos con la entidad Nota (sin Cascade.ALL para evitar que
    // se eliminen todas las notas al eliminar el alumno)
    @OneToMany(mappedBy = "alumno", fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Nota> notas;

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public int getEdad() {
        return edad;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public List<Nota> getNotas() {
        return notas;
    }

    public void setNotas(List<Nota> notas) {
        this.notas = notas;
    }
}
