package com.ventas.kaazar.repository;

import com.ventas.kaazar.domain.CarritoCliente;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CarritoCliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarritoClienteRepository extends JpaRepository<CarritoCliente, Long> {
}
