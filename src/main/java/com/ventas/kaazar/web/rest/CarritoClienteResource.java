package com.ventas.kaazar.web.rest;

import com.ventas.kaazar.domain.CarritoCliente;
import com.ventas.kaazar.service.CarritoClienteService;
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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.ventas.kaazar.domain.CarritoCliente}.
 */
@RestController
@RequestMapping("/api")
public class CarritoClienteResource {

    private final Logger log = LoggerFactory.getLogger(CarritoClienteResource.class);

    private static final String ENTITY_NAME = "carritoCliente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarritoClienteService carritoClienteService;

    public CarritoClienteResource(CarritoClienteService carritoClienteService) {
        this.carritoClienteService = carritoClienteService;
    }

    /**
     * {@code POST  /carrito-clientes} : Create a new carritoCliente.
     *
     * @param carritoCliente the carritoCliente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carritoCliente, or with status {@code 400 (Bad Request)} if the carritoCliente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carrito-clientes")
    public ResponseEntity<CarritoCliente> createCarritoCliente(@RequestBody CarritoCliente carritoCliente) throws URISyntaxException {
        log.debug("REST request to save CarritoCliente : {}", carritoCliente);
        if (carritoCliente.getId() != null) {
            throw new BadRequestAlertException("A new carritoCliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarritoCliente result = carritoClienteService.save(carritoCliente);
        return ResponseEntity.created(new URI("/api/carrito-clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carrito-clientes} : Updates an existing carritoCliente.
     *
     * @param carritoCliente the carritoCliente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carritoCliente,
     * or with status {@code 400 (Bad Request)} if the carritoCliente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carritoCliente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carrito-clientes")
    public ResponseEntity<CarritoCliente> updateCarritoCliente(@RequestBody CarritoCliente carritoCliente) throws URISyntaxException {
        log.debug("REST request to update CarritoCliente : {}", carritoCliente);
        if (carritoCliente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarritoCliente result = carritoClienteService.save(carritoCliente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carritoCliente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /carrito-clientes} : get all the carritoClientes.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carritoClientes in body.
     */
    @GetMapping("/carrito-clientes")
    public List<CarritoCliente> getAllCarritoClientes(@RequestParam(required = false) String filter) {
        if ("cuentacliente-is-null".equals(filter)) {
            log.debug("REST request to get all CarritoClientes where cuentaCliente is null");
            return carritoClienteService.findAllWhereCuentaClienteIsNull();
        }
        log.debug("REST request to get all CarritoClientes");
        return carritoClienteService.findAll();
    }

    /**
     * {@code GET  /carrito-clientes/:id} : get the "id" carritoCliente.
     *
     * @param id the id of the carritoCliente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carritoCliente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carrito-clientes/{id}")
    public ResponseEntity<CarritoCliente> getCarritoCliente(@PathVariable Long id) {
        log.debug("REST request to get CarritoCliente : {}", id);
        Optional<CarritoCliente> carritoCliente = carritoClienteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(carritoCliente);
    }

    /**
     * {@code DELETE  /carrito-clientes/:id} : delete the "id" carritoCliente.
     *
     * @param id the id of the carritoCliente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carrito-clientes/{id}")
    public ResponseEntity<Void> deleteCarritoCliente(@PathVariable Long id) {
        log.debug("REST request to delete CarritoCliente : {}", id);
        carritoClienteService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
