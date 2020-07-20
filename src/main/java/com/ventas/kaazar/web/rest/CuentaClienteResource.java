package com.ventas.kaazar.web.rest;

import com.ventas.kaazar.domain.CuentaCliente;
import com.ventas.kaazar.service.CuentaClienteService;
import com.ventas.kaazar.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ventas.kaazar.domain.CuentaCliente}.
 */
@RestController
@RequestMapping("/api")
public class CuentaClienteResource {

    private final Logger log = LoggerFactory.getLogger(CuentaClienteResource.class);

    private static final String ENTITY_NAME = "cuentaCliente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CuentaClienteService cuentaClienteService;

    public CuentaClienteResource(CuentaClienteService cuentaClienteService) {
        this.cuentaClienteService = cuentaClienteService;
    }

    /**
     * {@code POST  /cuenta-clientes} : Create a new cuentaCliente.
     *
     * @param cuentaCliente the cuentaCliente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cuentaCliente, or with status {@code 400 (Bad Request)} if the cuentaCliente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cuenta-clientes")
    public ResponseEntity<CuentaCliente> createCuentaCliente(@RequestBody CuentaCliente cuentaCliente) throws URISyntaxException {
        log.debug("REST request to save CuentaCliente : {}", cuentaCliente);
        if (cuentaCliente.getId() != null) {
            throw new BadRequestAlertException("A new cuentaCliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CuentaCliente result = cuentaClienteService.save(cuentaCliente);
        return ResponseEntity.created(new URI("/api/cuenta-clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cuenta-clientes} : Updates an existing cuentaCliente.
     *
     * @param cuentaCliente the cuentaCliente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cuentaCliente,
     * or with status {@code 400 (Bad Request)} if the cuentaCliente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cuentaCliente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cuenta-clientes")
    public ResponseEntity<CuentaCliente> updateCuentaCliente(@RequestBody CuentaCliente cuentaCliente) throws URISyntaxException {
        log.debug("REST request to update CuentaCliente : {}", cuentaCliente);
        if (cuentaCliente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CuentaCliente result = cuentaClienteService.save(cuentaCliente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cuentaCliente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cuenta-clientes} : get all the cuentaClientes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cuentaClientes in body.
     */
    @GetMapping("/cuenta-clientes")
    public List<CuentaCliente> getAllCuentaClientes() {
        log.debug("REST request to get all CuentaClientes");
        return cuentaClienteService.findAll();
    }

    /**
     * {@code GET  /cuenta-clientes/:id} : get the "id" cuentaCliente.
     *
     * @param id the id of the cuentaCliente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cuentaCliente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cuenta-clientes/{id}")
    public ResponseEntity<CuentaCliente> getCuentaCliente(@PathVariable Long id) {
        log.debug("REST request to get CuentaCliente : {}", id);
        Optional<CuentaCliente> cuentaCliente = cuentaClienteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cuentaCliente);
    }

    /**
     * {@code DELETE  /cuenta-clientes/:id} : delete the "id" cuentaCliente.
     *
     * @param id the id of the cuentaCliente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cuenta-clientes/{id}")
    public ResponseEntity<Void> deleteCuentaCliente(@PathVariable Long id) {
        log.debug("REST request to delete CuentaCliente : {}", id);
        cuentaClienteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
