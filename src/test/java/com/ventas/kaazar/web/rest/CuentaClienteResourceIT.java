package com.ventas.kaazar.web.rest;

import com.ventas.kaazar.AppKaazarApp;
import com.ventas.kaazar.domain.CuentaCliente;
import com.ventas.kaazar.repository.CuentaClienteRepository;
import com.ventas.kaazar.service.CuentaClienteService;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CuentaClienteResource} REST controller.
 */
@SpringBootTest(classes = AppKaazarApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CuentaClienteResourceIT {

    private static final String DEFAULT_USUARIO = "AAAAAAAAAA";
    private static final String UPDATED_USUARIO = "BBBBBBBBBB";

    private static final String DEFAULT_CLAVE = "AAAAAAAAAA";
    private static final String UPDATED_CLAVE = "BBBBBBBBBB";

    private static final String DEFAULT_AVATAR = "AAAAAAAAAA";
    private static final String UPDATED_AVATAR = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_ULTIMO_ACCESO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_ULTIMO_ACCESO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOMBRES = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRES = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDOS = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDOS = "BBBBBBBBBB";

    @Autowired
    private CuentaClienteRepository cuentaClienteRepository;

    @Autowired
    private CuentaClienteService cuentaClienteService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCuentaClienteMockMvc;

    private CuentaCliente cuentaCliente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CuentaCliente createEntity(EntityManager em) {
        CuentaCliente cuentaCliente = new CuentaCliente()
            .usuario(DEFAULT_USUARIO)
            .clave(DEFAULT_CLAVE)
            .avatar(DEFAULT_AVATAR)
            .fechaUltimoAcceso(DEFAULT_FECHA_ULTIMO_ACCESO)
            .nombres(DEFAULT_NOMBRES)
            .apellidos(DEFAULT_APELLIDOS);
        return cuentaCliente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CuentaCliente createUpdatedEntity(EntityManager em) {
        CuentaCliente cuentaCliente = new CuentaCliente()
            .usuario(UPDATED_USUARIO)
            .clave(UPDATED_CLAVE)
            .avatar(UPDATED_AVATAR)
            .fechaUltimoAcceso(UPDATED_FECHA_ULTIMO_ACCESO)
            .nombres(UPDATED_NOMBRES)
            .apellidos(UPDATED_APELLIDOS);
        return cuentaCliente;
    }

    @BeforeEach
    public void initTest() {
        cuentaCliente = createEntity(em);
    }

    @Test
    @Transactional
    public void createCuentaCliente() throws Exception {
        int databaseSizeBeforeCreate = cuentaClienteRepository.findAll().size();
        // Create the CuentaCliente
        restCuentaClienteMockMvc.perform(post("/api/cuenta-clientes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cuentaCliente)))
            .andExpect(status().isCreated());

        // Validate the CuentaCliente in the database
        List<CuentaCliente> cuentaClienteList = cuentaClienteRepository.findAll();
        assertThat(cuentaClienteList).hasSize(databaseSizeBeforeCreate + 1);
        CuentaCliente testCuentaCliente = cuentaClienteList.get(cuentaClienteList.size() - 1);
        assertThat(testCuentaCliente.getUsuario()).isEqualTo(DEFAULT_USUARIO);
        assertThat(testCuentaCliente.getClave()).isEqualTo(DEFAULT_CLAVE);
        assertThat(testCuentaCliente.getAvatar()).isEqualTo(DEFAULT_AVATAR);
        assertThat(testCuentaCliente.getFechaUltimoAcceso()).isEqualTo(DEFAULT_FECHA_ULTIMO_ACCESO);
        assertThat(testCuentaCliente.getNombres()).isEqualTo(DEFAULT_NOMBRES);
        assertThat(testCuentaCliente.getApellidos()).isEqualTo(DEFAULT_APELLIDOS);
    }

    @Test
    @Transactional
    public void createCuentaClienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cuentaClienteRepository.findAll().size();

        // Create the CuentaCliente with an existing ID
        cuentaCliente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCuentaClienteMockMvc.perform(post("/api/cuenta-clientes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cuentaCliente)))
            .andExpect(status().isBadRequest());

        // Validate the CuentaCliente in the database
        List<CuentaCliente> cuentaClienteList = cuentaClienteRepository.findAll();
        assertThat(cuentaClienteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCuentaClientes() throws Exception {
        // Initialize the database
        cuentaClienteRepository.saveAndFlush(cuentaCliente);

        // Get all the cuentaClienteList
        restCuentaClienteMockMvc.perform(get("/api/cuenta-clientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cuentaCliente.getId().intValue())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO)))
            .andExpect(jsonPath("$.[*].clave").value(hasItem(DEFAULT_CLAVE)))
            .andExpect(jsonPath("$.[*].avatar").value(hasItem(DEFAULT_AVATAR)))
            .andExpect(jsonPath("$.[*].fechaUltimoAcceso").value(hasItem(DEFAULT_FECHA_ULTIMO_ACCESO.toString())))
            .andExpect(jsonPath("$.[*].nombres").value(hasItem(DEFAULT_NOMBRES)))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS)));
    }
    
    @Test
    @Transactional
    public void getCuentaCliente() throws Exception {
        // Initialize the database
        cuentaClienteRepository.saveAndFlush(cuentaCliente);

        // Get the cuentaCliente
        restCuentaClienteMockMvc.perform(get("/api/cuenta-clientes/{id}", cuentaCliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cuentaCliente.getId().intValue()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO))
            .andExpect(jsonPath("$.clave").value(DEFAULT_CLAVE))
            .andExpect(jsonPath("$.avatar").value(DEFAULT_AVATAR))
            .andExpect(jsonPath("$.fechaUltimoAcceso").value(DEFAULT_FECHA_ULTIMO_ACCESO.toString()))
            .andExpect(jsonPath("$.nombres").value(DEFAULT_NOMBRES))
            .andExpect(jsonPath("$.apellidos").value(DEFAULT_APELLIDOS));
    }
    @Test
    @Transactional
    public void getNonExistingCuentaCliente() throws Exception {
        // Get the cuentaCliente
        restCuentaClienteMockMvc.perform(get("/api/cuenta-clientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCuentaCliente() throws Exception {
        // Initialize the database
        cuentaClienteService.save(cuentaCliente);

        int databaseSizeBeforeUpdate = cuentaClienteRepository.findAll().size();

        // Update the cuentaCliente
        CuentaCliente updatedCuentaCliente = cuentaClienteRepository.findById(cuentaCliente.getId()).get();
        // Disconnect from session so that the updates on updatedCuentaCliente are not directly saved in db
        em.detach(updatedCuentaCliente);
        updatedCuentaCliente
            .usuario(UPDATED_USUARIO)
            .clave(UPDATED_CLAVE)
            .avatar(UPDATED_AVATAR)
            .fechaUltimoAcceso(UPDATED_FECHA_ULTIMO_ACCESO)
            .nombres(UPDATED_NOMBRES)
            .apellidos(UPDATED_APELLIDOS);

        restCuentaClienteMockMvc.perform(put("/api/cuenta-clientes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCuentaCliente)))
            .andExpect(status().isOk());

        // Validate the CuentaCliente in the database
        List<CuentaCliente> cuentaClienteList = cuentaClienteRepository.findAll();
        assertThat(cuentaClienteList).hasSize(databaseSizeBeforeUpdate);
        CuentaCliente testCuentaCliente = cuentaClienteList.get(cuentaClienteList.size() - 1);
        assertThat(testCuentaCliente.getUsuario()).isEqualTo(UPDATED_USUARIO);
        assertThat(testCuentaCliente.getClave()).isEqualTo(UPDATED_CLAVE);
        assertThat(testCuentaCliente.getAvatar()).isEqualTo(UPDATED_AVATAR);
        assertThat(testCuentaCliente.getFechaUltimoAcceso()).isEqualTo(UPDATED_FECHA_ULTIMO_ACCESO);
        assertThat(testCuentaCliente.getNombres()).isEqualTo(UPDATED_NOMBRES);
        assertThat(testCuentaCliente.getApellidos()).isEqualTo(UPDATED_APELLIDOS);
    }

    @Test
    @Transactional
    public void updateNonExistingCuentaCliente() throws Exception {
        int databaseSizeBeforeUpdate = cuentaClienteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCuentaClienteMockMvc.perform(put("/api/cuenta-clientes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cuentaCliente)))
            .andExpect(status().isBadRequest());

        // Validate the CuentaCliente in the database
        List<CuentaCliente> cuentaClienteList = cuentaClienteRepository.findAll();
        assertThat(cuentaClienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCuentaCliente() throws Exception {
        // Initialize the database
        cuentaClienteService.save(cuentaCliente);

        int databaseSizeBeforeDelete = cuentaClienteRepository.findAll().size();

        // Delete the cuentaCliente
        restCuentaClienteMockMvc.perform(delete("/api/cuenta-clientes/{id}", cuentaCliente.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CuentaCliente> cuentaClienteList = cuentaClienteRepository.findAll();
        assertThat(cuentaClienteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
