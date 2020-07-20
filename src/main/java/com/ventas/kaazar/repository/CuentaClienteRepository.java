package com.ventas.kaazar.repository;

import com.ventas.kaazar.domain.CuentaCliente;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CuentaCliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CuentaClienteRepository extends JpaRepository<CuentaCliente, Long> {
}
