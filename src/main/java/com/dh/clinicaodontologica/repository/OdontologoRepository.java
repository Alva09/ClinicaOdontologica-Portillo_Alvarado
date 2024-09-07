package com.dh.clinicaodontologica.repository;

import com.dh.clinicaodontologica.entity.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OdontologoRepository extends JpaRepository<Odontologo, Long> {
    Optional<Odontologo> findByMatricula(String matricula);
    Boolean existsOdontologoByMatricula(String matricula);
}
