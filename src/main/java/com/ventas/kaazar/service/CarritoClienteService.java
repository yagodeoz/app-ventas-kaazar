package com.ventas.kaazar.service;

import com.ventas.kaazar.domain.CarritoCliente;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CarritoCliente}.
 */
public interface CarritoClienteService {

    /**
     * Save a carritoCliente.
     *
     * @param carritoCliente the entity to save.
     * @return the persisted entity.
     */
    CarritoCliente save(CarritoCliente carritoCliente);

    /**
     * Get all the carritoClientes.
     *
     * @return the list of entities.
     */
    List<CarritoCliente> findAll();
    /**
     * Get all the CarritoClienteDTO where CuentaCliente is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<CarritoCliente> findAllWhereCuentaClienteIsNull();


    /**
     * Get the "id" carritoCliente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CarritoCliente> findOne(Long id);

    /**
     * Delete the "id" carritoCliente.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
