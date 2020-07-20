package com.ventas.kaazar.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ventas.kaazar.web.rest.TestUtil;

public class CarritoClienteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarritoCliente.class);
        CarritoCliente carritoCliente1 = new CarritoCliente();
        carritoCliente1.setId(1L);
        CarritoCliente carritoCliente2 = new CarritoCliente();
        carritoCliente2.setId(carritoCliente1.getId());
        assertThat(carritoCliente1).isEqualTo(carritoCliente2);
        carritoCliente2.setId(2L);
        assertThat(carritoCliente1).isNotEqualTo(carritoCliente2);
        carritoCliente1.setId(null);
        assertThat(carritoCliente1).isNotEqualTo(carritoCliente2);
    }
}
