package com.sistemanotas.sistema_notas.repository;

import com.sistemanotas.sistema_notas.model.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
}
