package com.ventas.kaazar.web.rest;

import com.ventas.kaazar.domain.CarritoClienteDetalle;
import com.ventas.kaazar.service.CarritoClienteDetalleService;
import com.ventas.kaazar.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ventas.kaazar.domain.CarritoClienteDetalle}.
 */
@RestController
@RequestMapping("/api")
public class CarritoClienteDetalleResource {

    private final Logger log = LoggerFactory.getLogger(CarritoClienteDetalleResource.class);

    private static final String ENTITY_NAME = "carritoClienteDetalle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarritoClienteDetalleService carritoClienteDetalleService;

    public CarritoClienteDetalleResource(CarritoClienteDetalleService carritoClienteDetalleService) {
        this.carritoClienteDetalleService = carritoClienteDetalleService;
    }

    /**
     * {@code POST  /carrito-cliente-detalles} : Create a new carritoClienteDetalle.
     *
     * @param carritoClienteDetalle the carritoClienteDetalle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carritoClienteDetalle, or with status {@code 400 (Bad Request)} if the carritoClienteDetalle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carrito-cliente-detalles")
    public ResponseEntity<CarritoClienteDetalle> createCarritoClienteDetalle(@RequestBody CarritoClienteDetalle carritoClienteDetalle) throws URISyntaxException {
        log.debug("REST request to save CarritoClienteDetalle : {}", carritoClienteDetalle);
        if (carritoClienteDetalle.getId() != null) {
            throw new BadRequestAlertException("A new carritoClienteDetalle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarritoClienteDetalle result = carritoClienteDetalleService.save(carritoClienteDetalle);
        return ResponseEntity.created(new URI("/api/carrito-cliente-detalles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carrito-cliente-detalles} : Updates an existing carritoClienteDetalle.
     *
     * @param carritoClienteDetalle the carritoClienteDetalle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carritoClienteDetalle,
     * or with status {@code 400 (Bad Request)} if the carritoClienteDetalle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carritoClienteDetalle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carrito-cliente-detalles")
    public ResponseEntity<CarritoClienteDetalle> updateCarritoClienteDetalle(@RequestBody CarritoClienteDetalle carritoClienteDetalle) throws URISyntaxException {
        log.debug("REST request to update CarritoClienteDetalle : {}", carritoClienteDetalle);
        if (carritoClienteDetalle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarritoClienteDetalle result = carritoClienteDetalleService.save(carritoClienteDetalle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carritoClienteDetalle.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /carrito-cliente-detalles} : get all the carritoClienteDetalles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carritoClienteDetalles in body.
     */
    @GetMapping("/carrito-cliente-detalles")
    public ResponseEntity<List<CarritoClienteDetalle>> getAllCarritoClienteDetalles(Pageable pageable) {
        log.debug("REST request to get a page of CarritoClienteDetalles");
        Page<CarritoClienteDetalle> page = carritoClienteDetalleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /carrito-cliente-detalles/:id} : get the "id" carritoClienteDetalle.
     *
     * @param id the id of the carritoClienteDetalle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carritoClienteDetalle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carrito-cliente-detalles/{id}")
    public ResponseEntity<CarritoClienteDetalle> getCarritoClienteDetalle(@PathVariable Long id) {
        log.debug("REST request to get CarritoClienteDetalle : {}", id);
        Optional<CarritoClienteDetalle> carritoClienteDetalle = carritoClienteDetalleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(carritoClienteDetalle);
    }

    /**
     * {@code DELETE  /carrito-cliente-detalles/:id} : delete the "id" carritoClienteDetalle.
     *
     * @param id the id of the carritoClienteDetalle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carrito-cliente-detalles/{id}")
    public ResponseEntity<Void> deleteCarritoClienteDetalle(@PathVariable Long id) {
        log.debug("REST request to delete CarritoClienteDetalle : {}", id);
        carritoClienteDetalleService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
