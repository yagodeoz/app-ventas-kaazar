package com.ventas.kaazar.repository;

import com.ventas.kaazar.domain.CarritoClienteDetalle;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CarritoClienteDetalle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarritoClienteDetalleRepository extends JpaRepository<CarritoClienteDetalle, Long> {
}
