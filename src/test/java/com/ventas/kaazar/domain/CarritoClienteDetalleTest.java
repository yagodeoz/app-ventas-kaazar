package com.ventas.kaazar.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ventas.kaazar.web.rest.TestUtil;

public class CarritoClienteDetalleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarritoClienteDetalle.class);
        CarritoClienteDetalle carritoClienteDetalle1 = new CarritoClienteDetalle();
        carritoClienteDetalle1.setId(1L);
        CarritoClienteDetalle carritoClienteDetalle2 = new CarritoClienteDetalle();
        carritoClienteDetalle2.setId(carritoClienteDetalle1.getId());
        assertThat(carritoClienteDetalle1).isEqualTo(carritoClienteDetalle2);
        carritoClienteDetalle2.setId(2L);
        assertThat(carritoClienteDetalle1).isNotEqualTo(carritoClienteDetalle2);
        carritoClienteDetalle1.setId(null);
        assertThat(carritoClienteDetalle1).isNotEqualTo(carritoClienteDetalle2);
    }
}
