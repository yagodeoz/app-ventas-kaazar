package com.ventas.kaazar.service.impl;

import com.ventas.kaazar.service.CarritoClienteService;
import com.ventas.kaazar.domain.CarritoCliente;
import com.ventas.kaazar.repository.CarritoClienteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link CarritoCliente}.
 */
@Service
@Transactional
public class CarritoClienteServiceImpl implements CarritoClienteService {

    private final Logger log = LoggerFactory.getLogger(CarritoClienteServiceImpl.class);

    private final CarritoClienteRepository carritoClienteRepository;

    public CarritoClienteServiceImpl(CarritoClienteRepository carritoClienteRepository) {
        this.carritoClienteRepository = carritoClienteRepository;
    }

    @Override
    public CarritoCliente save(CarritoCliente carritoCliente) {
        log.debug("Request to save CarritoCliente : {}", carritoCliente);
        return carritoClienteRepository.save(carritoCliente);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarritoCliente> findAll() {
        log.debug("Request to get all CarritoClientes");
        return carritoClienteRepository.findAll();
    }



    /**
     *  Get all the carritoClientes where CuentaCliente is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<CarritoCliente> findAllWhereCuentaClienteIsNull() {
        log.debug("Request to get all carritoClientes where CuentaCliente is null");
        return StreamSupport
            .stream(carritoClienteRepository.findAll().spliterator(), false)
            .filter(carritoCliente -> carritoCliente.getCuentaCliente() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CarritoCliente> findOne(Long id) {
        log.debug("Request to get CarritoCliente : {}", id);
        return carritoClienteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CarritoCliente : {}", id);
        carritoClienteRepository.deleteById(id);
    }
}
