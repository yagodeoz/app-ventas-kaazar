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
import { getEntity, updateEntity, createEntity, reset } from './cuenta-cliente.reducer';
import { ICuentaCliente } from 'app/shared/model/cuenta-cliente.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICuentaClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CuentaClienteUpdate = (props: ICuentaClienteUpdateProps) => {
  const [carritoClienteId, setCarritoClienteId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { cuentaClienteEntity, carritoClientes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cuenta-cliente');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCarritoClientes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...cuentaClienteEntity,
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
          <h2 id="appKaazarApp.cuentaCliente.home.createOrEditLabel">
            <Translate contentKey="appKaazarApp.cuentaCliente.home.createOrEditLabel">Create or edit a CuentaCliente</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : cuentaClienteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cuenta-cliente-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="cuenta-cliente-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="usuarioLabel" for="cuenta-cliente-usuario">
                  <Translate contentKey="appKaazarApp.cuentaCliente.usuario">Usuario</Translate>
                </Label>
                <AvField id="cuenta-cliente-usuario" type="text" name="usuario" />
              </AvGroup>
              <AvGroup>
                <Label id="claveLabel" for="cuenta-cliente-clave">
                  <Translate contentKey="appKaazarApp.cuentaCliente.clave">Clave</Translate>
                </Label>
                <AvField id="cuenta-cliente-clave" type="text" name="clave" />
              </AvGroup>
              <AvGroup>
                <Label id="avatarLabel" for="cuenta-cliente-avatar">
                  <Translate contentKey="appKaazarApp.cuentaCliente.avatar">Avatar</Translate>
                </Label>
                <AvField id="cuenta-cliente-avatar" type="text" name="avatar" />
              </AvGroup>
              <AvGroup>
                <Label id="fechaUltimoAccesoLabel" for="cuenta-cliente-fechaUltimoAcceso">
                  <Translate contentKey="appKaazarApp.cuentaCliente.fechaUltimoAcceso">Fecha Ultimo Acceso</Translate>
                </Label>
                <AvField id="cuenta-cliente-fechaUltimoAcceso" type="date" className="form-control" name="fechaUltimoAcceso" />
              </AvGroup>
              <AvGroup>
                <Label id="nombresLabel" for="cuenta-cliente-nombres">
                  <Translate contentKey="appKaazarApp.cuentaCliente.nombres">Nombres</Translate>
                </Label>
                <AvField id="cuenta-cliente-nombres" type="text" name="nombres" />
              </AvGroup>
              <AvGroup>
                <Label id="apellidosLabel" for="cuenta-cliente-apellidos">
                  <Translate contentKey="appKaazarApp.cuentaCliente.apellidos">Apellidos</Translate>
                </Label>
                <AvField id="cuenta-cliente-apellidos" type="text" name="apellidos" />
              </AvGroup>
              <AvGroup>
                <Label for="cuenta-cliente-carritoCliente">
                  <Translate contentKey="appKaazarApp.cuentaCliente.carritoCliente">Carrito Cliente</Translate>
                </Label>
                <AvInput id="cuenta-cliente-carritoCliente" type="select" className="form-control" name="carritoCliente.id">
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
              <Button tag={Link} id="cancel-save" to="/cuenta-cliente" replace color="info">
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
  cuentaClienteEntity: storeState.cuentaCliente.entity,
  loading: storeState.cuentaCliente.loading,
  updating: storeState.cuentaCliente.updating,
  updateSuccess: storeState.cuentaCliente.updateSuccess,
});

const mapDispatchToProps = {
  getCarritoClientes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CuentaClienteUpdate);
