import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICuentaCliente } from 'app/shared/model/cuenta-cliente.model';
import { getEntities as getCuentaClientes } from 'app/entities/cuenta-cliente/cuenta-cliente.reducer';
import { getEntity, updateEntity, createEntity, reset } from './carrito-cliente.reducer';
import { ICarritoCliente } from 'app/shared/model/carrito-cliente.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICarritoClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarritoClienteUpdate = (props: ICarritoClienteUpdateProps) => {
  const [cuentaClienteId, setCuentaClienteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { carritoClienteEntity, cuentaClientes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/carrito-cliente');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCuentaClientes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...carritoClienteEntity,
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
          <h2 id="appKaazarApp.carritoCliente.home.createOrEditLabel">
            <Translate contentKey="appKaazarApp.carritoCliente.home.createOrEditLabel">Create or edit a CarritoCliente</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : carritoClienteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="carrito-cliente-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="carrito-cliente-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fechaAccesoLabel" for="carrito-cliente-fechaAcceso">
                  <Translate contentKey="appKaazarApp.carritoCliente.fechaAcceso">Fecha Acceso</Translate>
                </Label>
                <AvField id="carrito-cliente-fechaAcceso" type="date" className="form-control" name="fechaAcceso" />
              </AvGroup>
              <AvGroup>
                <Label id="fechaUltimaCompraLabel" for="carrito-cliente-fechaUltimaCompra">
                  <Translate contentKey="appKaazarApp.carritoCliente.fechaUltimaCompra">Fecha Ultima Compra</Translate>
                </Label>
                <AvField id="carrito-cliente-fechaUltimaCompra" type="date" className="form-control" name="fechaUltimaCompra" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/carrito-cliente" replace color="info">
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
  cuentaClientes: storeState.cuentaCliente.entities,
  carritoClienteEntity: storeState.carritoCliente.entity,
  loading: storeState.carritoCliente.loading,
  updating: storeState.carritoCliente.updating,
  updateSuccess: storeState.carritoCliente.updateSuccess,
});

const mapDispatchToProps = {
  getCuentaClientes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarritoClienteUpdate);
