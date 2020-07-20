package com.ventas.kaazar.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A CarritoClienteDetalle.
 */
@Entity
@Table(name = "carrito_cliente_detalle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CarritoClienteDetalle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cantidad")
    private Long cantidad;

    @Column(name = "total")
    private Double total;

    @ManyToOne
    @JsonIgnoreProperties(value = "carritoClienteDetalles", allowSetters = true)
    private CarritoCliente carritoCliente;

    @ManyToOne
    @JsonIgnoreProperties(value = "carritoClienteDetalles", allowSetters = true)
    private Productos productos;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public CarritoClienteDetalle cantidad(Long cantidad) {
        this.cantidad = cantidad;
        return this;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }

    public Double getTotal() {
        return total;
    }

    public CarritoClienteDetalle total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public CarritoCliente getCarritoCliente() {
        return carritoCliente;
    }

    public CarritoClienteDetalle carritoCliente(CarritoCliente carritoCliente) {
        this.carritoCliente = carritoCliente;
        return this;
    }

    public void setCarritoCliente(CarritoCliente carritoCliente) {
        this.carritoCliente = carritoCliente;
    }

    public Productos getProductos() {
        return productos;
    }

    public CarritoClienteDetalle productos(Productos productos) {
        this.productos = productos;
        return this;
    }

    public void setProductos(Productos productos) {
        this.productos = productos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CarritoClienteDetalle)) {
            return false;
        }
        return id != null && id.equals(((CarritoClienteDetalle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CarritoClienteDetalle{" +
            "id=" + getId() +
            ", cantidad=" + getCantidad() +
            ", total=" + getTotal() +
            "}";
    }
}
