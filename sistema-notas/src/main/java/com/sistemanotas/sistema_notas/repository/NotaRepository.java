package com.sistemanotas.sistema_notas.repository;

import com.sistemanotas.sistema_notas.model.Nota;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotaRepository extends JpaRepository<Nota, Long> {
}
