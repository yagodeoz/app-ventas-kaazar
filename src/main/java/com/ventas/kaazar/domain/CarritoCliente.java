package com.ventas.kaazar.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A CarritoCliente.
 */
@Entity
@Table(name = "carrito_cliente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CarritoCliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "fecha_acceso")
    private LocalDate fechaAcceso;

    @Column(name = "fecha_ultima_compra")
    private LocalDate fechaUltimaCompra;

    @OneToMany(mappedBy = "carritoCliente")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<CarritoClienteDetalle> carritoClienteDetalles = new HashSet<>();

    @OneToOne(mappedBy = "carritoCliente")
    @JsonIgnore
    private CuentaCliente cuentaCliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaAcceso() {
        return fechaAcceso;
    }

    public CarritoCliente fechaAcceso(LocalDate fechaAcceso) {
        this.fechaAcceso = fechaAcceso;
        return this;
    }

    public void setFechaAcceso(LocalDate fechaAcceso) {
        this.fechaAcceso = fechaAcceso;
    }

    public LocalDate getFechaUltimaCompra() {
        return fechaUltimaCompra;
    }

    public CarritoCliente fechaUltimaCompra(LocalDate fechaUltimaCompra) {
        this.fechaUltimaCompra = fechaUltimaCompra;
        return this;
    }

    public void setFechaUltimaCompra(LocalDate fechaUltimaCompra) {
        this.fechaUltimaCompra = fechaUltimaCompra;
    }

    public Set<CarritoClienteDetalle> getCarritoClienteDetalles() {
        return carritoClienteDetalles;
    }

    public CarritoCliente carritoClienteDetalles(Set<CarritoClienteDetalle> carritoClienteDetalles) {
        this.carritoClienteDetalles = carritoClienteDetalles;
        return this;
    }

    public CarritoCliente addCarritoClienteDetalle(CarritoClienteDetalle carritoClienteDetalle) {
        this.carritoClienteDetalles.add(carritoClienteDetalle);
        carritoClienteDetalle.setCarritoCliente(this);
        return this;
    }

    public CarritoCliente removeCarritoClienteDetalle(CarritoClienteDetalle carritoClienteDetalle) {
        this.carritoClienteDetalles.remove(carritoClienteDetalle);
        carritoClienteDetalle.setCarritoCliente(null);
        return this;
    }

    public void setCarritoClienteDetalles(Set<CarritoClienteDetalle> carritoClienteDetalles) {
        this.carritoClienteDetalles = carritoClienteDetalles;
    }

    public CuentaCliente getCuentaCliente() {
        return cuentaCliente;
    }

    public CarritoCliente cuentaCliente(CuentaCliente cuentaCliente) {
        this.cuentaCliente = cuentaCliente;
        return this;
    }

    public void setCuentaCliente(CuentaCliente cuentaCliente) {
        this.cuentaCliente = cuentaCliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CarritoCliente)) {
            return false;
        }
        return id != null && id.equals(((CarritoCliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CarritoCliente{" +
            "id=" + getId() +
            ", fechaAcceso='" + getFechaAcceso() + "'" +
            ", fechaUltimaCompra='" + getFechaUltimaCompra() + "'" +
            "}";
    }
}
