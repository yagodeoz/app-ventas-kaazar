package com.ventas.kaazar.service;

import com.ventas.kaazar.domain.Empresa;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Empresa}.
 */
public interface EmpresaService {

    /**
     * Save a empresa.
     *
     * @param empresa the entity to save.
     * @return the persisted entity.
     */
    Empresa save(Empresa empresa);

    /**
     * Get all the empresas.
     *
     * @return the list of entities.
     */
    List<Empresa> findAll();


    /**
     * Get the "id" empresa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Empresa> findOne(Long id);

    /**
     * Delete the "id" empresa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
