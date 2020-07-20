package com.ventas.kaazar.web.rest;

import com.ventas.kaazar.AppKaazarApp;
import com.ventas.kaazar.domain.CarritoClienteDetalle;
import com.ventas.kaazar.repository.CarritoClienteDetalleRepository;
import com.ventas.kaazar.service.CarritoClienteDetalleService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CarritoClienteDetalleResource} REST controller.
 */
@SpringBootTest(classes = AppKaazarApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CarritoClienteDetalleResourceIT {

    private static final Long DEFAULT_CANTIDAD = 1L;
    private static final Long UPDATED_CANTIDAD = 2L;

    private static final Double DEFAULT_TOTAL = 1D;
    private static final Double UPDATED_TOTAL = 2D;

    @Autowired
    private CarritoClienteDetalleRepository carritoClienteDetalleRepository;

    @Autowired
    private CarritoClienteDetalleService carritoClienteDetalleService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCarritoClienteDetalleMockMvc;

    private CarritoClienteDetalle carritoClienteDetalle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarritoClienteDetalle createEntity(EntityManager em) {
        CarritoClienteDetalle carritoClienteDetalle = new CarritoClienteDetalle()
            .cantidad(DEFAULT_CANTIDAD)
            .total(DEFAULT_TOTAL);
        return carritoClienteDetalle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarritoClienteDetalle createUpdatedEntity(EntityManager em) {
        CarritoClienteDetalle carritoClienteDetalle = new CarritoClienteDetalle()
            .cantidad(UPDATED_CANTIDAD)
            .total(UPDATED_TOTAL);
        return carritoClienteDetalle;
    }

    @BeforeEach
    public void initTest() {
        carritoClienteDetalle = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarritoClienteDetalle() throws Exception {
        int databaseSizeBeforeCreate = carritoClienteDetalleRepository.findAll().size();
        // Create the CarritoClienteDetalle
        restCarritoClienteDetalleMockMvc.perform(post("/api/carrito-cliente-detalles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoClienteDetalle)))
            .andExpect(status().isCreated());

        // Validate the CarritoClienteDetalle in the database
        List<CarritoClienteDetalle> carritoClienteDetalleList = carritoClienteDetalleRepository.findAll();
        assertThat(carritoClienteDetalleList).hasSize(databaseSizeBeforeCreate + 1);
        CarritoClienteDetalle testCarritoClienteDetalle = carritoClienteDetalleList.get(carritoClienteDetalleList.size() - 1);
        assertThat(testCarritoClienteDetalle.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
        assertThat(testCarritoClienteDetalle.getTotal()).isEqualTo(DEFAULT_TOTAL);
    }

    @Test
    @Transactional
    public void createCarritoClienteDetalleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carritoClienteDetalleRepository.findAll().size();

        // Create the CarritoClienteDetalle with an existing ID
        carritoClienteDetalle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarritoClienteDetalleMockMvc.perform(post("/api/carrito-cliente-detalles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoClienteDetalle)))
            .andExpect(status().isBadRequest());

        // Validate the CarritoClienteDetalle in the database
        List<CarritoClienteDetalle> carritoClienteDetalleList = carritoClienteDetalleRepository.findAll();
        assertThat(carritoClienteDetalleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCarritoClienteDetalles() throws Exception {
        // Initialize the database
        carritoClienteDetalleRepository.saveAndFlush(carritoClienteDetalle);

        // Get all the carritoClienteDetalleList
        restCarritoClienteDetalleMockMvc.perform(get("/api/carrito-cliente-detalles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carritoClienteDetalle.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.intValue())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCarritoClienteDetalle() throws Exception {
        // Initialize the database
        carritoClienteDetalleRepository.saveAndFlush(carritoClienteDetalle);

        // Get the carritoClienteDetalle
        restCarritoClienteDetalleMockMvc.perform(get("/api/carrito-cliente-detalles/{id}", carritoClienteDetalle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(carritoClienteDetalle.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.intValue()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCarritoClienteDetalle() throws Exception {
        // Get the carritoClienteDetalle
        restCarritoClienteDetalleMockMvc.perform(get("/api/carrito-cliente-detalles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarritoClienteDetalle() throws Exception {
        // Initialize the database
        carritoClienteDetalleService.save(carritoClienteDetalle);

        int databaseSizeBeforeUpdate = carritoClienteDetalleRepository.findAll().size();

        // Update the carritoClienteDetalle
        CarritoClienteDetalle updatedCarritoClienteDetalle = carritoClienteDetalleRepository.findById(carritoClienteDetalle.getId()).get();
        // Disconnect from session so that the updates on updatedCarritoClienteDetalle are not directly saved in db
        em.detach(updatedCarritoClienteDetalle);
        updatedCarritoClienteDetalle
            .cantidad(UPDATED_CANTIDAD)
            .total(UPDATED_TOTAL);

        restCarritoClienteDetalleMockMvc.perform(put("/api/carrito-cliente-detalles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarritoClienteDetalle)))
            .andExpect(status().isOk());

        // Validate the CarritoClienteDetalle in the database
        List<CarritoClienteDetalle> carritoClienteDetalleList = carritoClienteDetalleRepository.findAll();
        assertThat(carritoClienteDetalleList).hasSize(databaseSizeBeforeUpdate);
        CarritoClienteDetalle testCarritoClienteDetalle = carritoClienteDetalleList.get(carritoClienteDetalleList.size() - 1);
        assertThat(testCarritoClienteDetalle.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
        assertThat(testCarritoClienteDetalle.getTotal()).isEqualTo(UPDATED_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingCarritoClienteDetalle() throws Exception {
        int databaseSizeBeforeUpdate = carritoClienteDetalleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarritoClienteDetalleMockMvc.perform(put("/api/carrito-cliente-detalles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carritoClienteDetalle)))
            .andExpect(status().isBadRequest());

        // Validate the CarritoClienteDetalle in the database
        List<CarritoClienteDetalle> carritoClienteDetalleList = carritoClienteDetalleRepository.findAll();
        assertThat(carritoClienteDetalleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarritoClienteDetalle() throws Exception {
        // Initialize the database
        carritoClienteDetalleService.save(carritoClienteDetalle);

        int databaseSizeBeforeDelete = carritoClienteDetalleRepository.findAll().size();

        // Delete the carritoClienteDetalle
        restCarritoClienteDetalleMockMvc.perform(delete("/api/carrito-cliente-detalles/{id}", carritoClienteDetalle.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CarritoClienteDetalle> carritoClienteDetalleList = carritoClienteDetalleRepository.findAll();
        assertThat(carritoClienteDetalleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
