package com.ventas.kaazar.service;

import com.ventas.kaazar.domain.CuentaCliente;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CuentaCliente}.
 */
public interface CuentaClienteService {

    /**
     * Save a cuentaCliente.
     *
     * @param cuentaCliente the entity to save.
     * @return the persisted entity.
     */
    CuentaCliente save(CuentaCliente cuentaCliente);

    /**
     * Get all the cuentaClientes.
     *
     * @return the list of entities.
     */
    List<CuentaCliente> findAll();


    /**
     * Get the "id" cuentaCliente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CuentaCliente> findOne(Long id);

    /**
     * Delete the "id" cuentaCliente.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
