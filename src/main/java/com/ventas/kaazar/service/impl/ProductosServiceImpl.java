package com.ventas.kaazar.service.impl;

import com.ventas.kaazar.service.ProductosService;
import com.ventas.kaazar.domain.Productos;
import com.ventas.kaazar.repository.ProductosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Productos}.
 */
@Service
@Transactional
public class ProductosServiceImpl implements ProductosService {

    private final Logger log = LoggerFactory.getLogger(ProductosServiceImpl.class);

    private final ProductosRepository productosRepository;

    public ProductosServiceImpl(ProductosRepository productosRepository) {
        this.productosRepository = productosRepository;
    }

    @Override
    public Productos save(Productos productos) {
        log.debug("Request to save Productos : {}", productos);
        return productosRepository.save(productos);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Productos> findAll(Pageable pageable) {
        log.debug("Request to get all Productos");
        return productosRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Productos> findOne(Long id) {
        log.debug("Request to get Productos : {}", id);
        return productosRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Productos : {}", id);
        productosRepository.deleteById(id);
    }
}
