package com.ventas.kaazar.service.impl;

import com.ventas.kaazar.service.CuentaClienteService;
import com.ventas.kaazar.domain.CuentaCliente;
import com.ventas.kaazar.repository.CuentaClienteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link CuentaCliente}.
 */
@Service
@Transactional
public class CuentaClienteServiceImpl implements CuentaClienteService {

    private final Logger log = LoggerFactory.getLogger(CuentaClienteServiceImpl.class);

    private final CuentaClienteRepository cuentaClienteRepository;

    public CuentaClienteServiceImpl(CuentaClienteRepository cuentaClienteRepository) {
        this.cuentaClienteRepository = cuentaClienteRepository;
    }

    @Override
    public CuentaCliente save(CuentaCliente cuentaCliente) {
        log.debug("Request to save CuentaCliente : {}", cuentaCliente);
        return cuentaClienteRepository.save(cuentaCliente);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CuentaCliente> findAll() {
        log.debug("Request to get all CuentaClientes");
        return cuentaClienteRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CuentaCliente> findOne(Long id) {
        log.debug("Request to get CuentaCliente : {}", id);
        return cuentaClienteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CuentaCliente : {}", id);
        cuentaClienteRepository.deleteById(id);
    }
}
