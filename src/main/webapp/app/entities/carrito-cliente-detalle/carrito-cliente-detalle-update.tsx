import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICarritoCliente } from 'app/shared/model/carrito-cliente.model';
import { getEntities as getCarritoClientes } from 'app/entities/carrito-cliente/carrito-cliente.reducer';
import { IProductos } from 'app/shared/model/productos.model';
import { getEntities as getProductos } from 'app/entities/productos/productos.reducer';
import { getEntity, updateEntity, createEntity, reset } from './carrito-cliente-detalle.reducer';
import { ICarritoClienteDetalle } from 'app/shared/model/carrito-cliente-detalle.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICarritoClienteDetalleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarritoClienteDetalleUpdate = (props: ICarritoClienteDetalleUpdateProps) => {
  const [carritoClienteId, setCarritoClienteId] = useState('0');
  const [productosId, setProductosId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { carritoClienteDetalleEntity, carritoClientes, productos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/carrito-cliente-detalle' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCarritoClientes();
    props.getProductos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...carritoClienteDetalleEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="appKaazarApp.carritoClienteDetalle.home.createOrEditLabel">
            <Translate contentKey="appKaazarApp.carritoClienteDetalle.home.createOrEditLabel">
              Create or edit a CarritoClienteDetalle
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : carritoClienteDetalleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="carrito-cliente-detalle-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="carrito-cliente-detalle-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cantidadLabel" for="carrito-cliente-detalle-cantidad">
                  <Translate contentKey="appKaazarApp.carritoClienteDetalle.cantidad">Cantidad</Translate>
                </Label>
                <AvField id="carrito-cliente-detalle-cantidad" type="string" className="form-control" name="cantidad" />
              </AvGroup>
              <AvGroup>
                <Label id="totalLabel" for="carrito-cliente-detalle-total">
                  <Translate contentKey="appKaazarApp.carritoClienteDetalle.total">Total</Translate>
                </Label>
                <AvField id="carrito-cliente-detalle-total" type="string" className="form-control" name="total" />
              </AvGroup>
              <AvGroup>
                <Label for="carrito-cliente-detalle-carritoCliente">
                  <Translate contentKey="appKaazarApp.carritoClienteDetalle.carritoCliente">Carrito Cliente</Translate>
                </Label>
                <AvInput id="carrito-cliente-detalle-carritoCliente" type="select" className="form-control" name="carritoCliente.id">
                  <option value="" key="0" />
                  {carritoClientes
                    ? carritoClientes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="carrito-cliente-detalle-productos">
                  <Translate contentKey="appKaazarApp.carritoClienteDetalle.productos">Productos</Translate>
                </Label>
                <AvInput id="carrito-cliente-detalle-productos" type="select" className="form-control" name="productos.id">
                  <option value="" key="0" />
                  {productos
                    ? productos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/carrito-cliente-detalle" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  carritoClientes: storeState.carritoCliente.entities,
  productos: storeState.productos.entities,
  carritoClienteDetalleEntity: storeState.carritoClienteDetalle.entity,
  loading: storeState.carritoClienteDetalle.loading,
  updating: storeState.carritoClienteDetalle.updating,
  updateSuccess: storeState.carritoClienteDetalle.updateSuccess,
});

const mapDispatchToProps = {
  getCarritoClientes,
  getProductos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarritoClienteDetalleUpdate);
