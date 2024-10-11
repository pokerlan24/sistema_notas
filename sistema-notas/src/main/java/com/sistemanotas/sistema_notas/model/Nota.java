package com.sistemanotas.sistema_notas.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "notas")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int actividad;
    private int primerParcial;
    private int segundoParcial;
    private int examenFinal;
    private int total;

    @ManyToOne
    @JoinColumn(name = "alumno_id")
    @JsonIgnoreProperties("notas")  // Evita referencia circular
    private Alumno alumno;

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getActividad() {
        return actividad;
    }

    public void setActividad(int actividad) {
        this.actividad = actividad;
        calcularTotal();  // Recalcula el total cuando se actualiza la actividad
    }

    public int getPrimerParcial() {
        return primerParcial;
    }

    public void setPrimerParcial(int primerParcial) {
        this.primerParcial = primerParcial;
        calcularTotal();  // Recalcula el total cuando se actualiza el primer parcial
    }

    public int getSegundoParcial() {
        return segundoParcial;
    }

    public void setSegundoParcial(int segundoParcial) {
        this.segundoParcial = segundoParcial;
        calcularTotal();  // Recalcula el total cuando se actualiza el segundo parcial
    }

    public int getExamenFinal() {
        return examenFinal;
    }

    public void setExamenFinal(int examenFinal) {
        this.examenFinal = examenFinal;
        calcularTotal();  // Recalcula el total cuando se actualiza el examen final
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;  // Evita que sea calculado automáticamente en este setter
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    // Método para calcular automáticamente el total
    private void calcularTotal() {
        this.total = this.actividad + this.primerParcial + this.segundoParcial + this.examenFinal;
    }
}
