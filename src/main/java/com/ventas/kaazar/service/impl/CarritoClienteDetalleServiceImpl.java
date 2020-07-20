package com.ventas.kaazar.service.impl;

import com.ventas.kaazar.service.CarritoClienteDetalleService;
import com.ventas.kaazar.domain.CarritoClienteDetalle;
import com.ventas.kaazar.repository.CarritoClienteDetalleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CarritoClienteDetalle}.
 */
@Service
@Transactional
public class CarritoClienteDetalleServiceImpl implements CarritoClienteDetalleService {

    private final Logger log = LoggerFactory.getLogger(CarritoClienteDetalleServiceImpl.class);

    private final CarritoClienteDetalleRepository carritoClienteDetalleRepository;

    public CarritoClienteDetalleServiceImpl(CarritoClienteDetalleRepository carritoClienteDetalleRepository) {
        this.carritoClienteDetalleRepository = carritoClienteDetalleRepository;
    }

    @Override
    public CarritoClienteDetalle save(CarritoClienteDetalle carritoClienteDetalle) {
        log.debug("Request to save CarritoClienteDetalle : {}", carritoClienteDetalle);
        return carritoClienteDetalleRepository.save(carritoClienteDetalle);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CarritoClienteDetalle> findAll(Pageable pageable) {
        log.debug("Request to get all CarritoClienteDetalles");
        return carritoClienteDetalleRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CarritoClienteDetalle> findOne(Long id) {
        log.debug("Request to get CarritoClienteDetalle : {}", id);
        return carritoClienteDetalleRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CarritoClienteDetalle : {}", id);
        carritoClienteDetalleRepository.deleteById(id);
    }
}
