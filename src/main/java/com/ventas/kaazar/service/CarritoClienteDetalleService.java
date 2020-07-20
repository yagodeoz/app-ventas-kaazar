package com.ventas.kaazar.service;

import com.ventas.kaazar.domain.CarritoClienteDetalle;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link CarritoClienteDetalle}.
 */
public interface CarritoClienteDetalleService {

    /**
     * Save a carritoClienteDetalle.
     *
     * @param carritoClienteDetalle the entity to save.
     * @return the persisted entity.
     */
    CarritoClienteDetalle save(CarritoClienteDetalle carritoClienteDetalle);

    /**
     * Get all the carritoClienteDetalles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CarritoClienteDetalle> findAll(Pageable pageable);


    /**
     * Get the "id" carritoClienteDetalle.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CarritoClienteDetalle> findOne(Long id);

    /**
     * Delete the "id" carritoClienteDetalle.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
