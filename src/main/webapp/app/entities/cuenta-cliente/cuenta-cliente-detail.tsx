import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cuenta-cliente.reducer';
import { ICuentaCliente } from 'app/shared/model/cuenta-cliente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICuentaClienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CuentaClienteDetail = (props: ICuentaClienteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cuentaClienteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="appKaazarApp.cuentaCliente.detail.title">CuentaCliente</Translate> [<b>{cuentaClienteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="usuario">
              <Translate contentKey="appKaazarApp.cuentaCliente.usuario">Usuario</Translate>
            </span>
          </dt>
          <dd>{cuentaClienteEntity.usuario}</dd>
          <dt>
            <span id="clave">
              <Translate contentKey="appKaazarApp.cuentaCliente.clave">Clave</Translate>
            </span>
          </dt>
          <dd>{cuentaClienteEntity.clave}</dd>
          <dt>
            <span id="avatar">
              <Translate contentKey="appKaazarApp.cuentaCliente.avatar">Avatar</Translate>
            </span>
          </dt>
          <dd>{cuentaClienteEntity.avatar}</dd>
          <dt>
            <span id="fechaUltimoAcceso">
              <Translate contentKey="appKaazarApp.cuentaCliente.fechaUltimoAcceso">Fecha Ultimo Acceso</Translate>
            </span>
          </dt>
          <dd>
            {cuentaClienteEntity.fechaUltimoAcceso ? (
              <TextFormat value={cuentaClienteEntity.fechaUltimoAcceso} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="nombres">
              <Translate contentKey="appKaazarApp.cuentaCliente.nombres">Nombres</Translate>
            </span>
          </dt>
          <dd>{cuentaClienteEntity.nombres}</dd>
          <dt>
            <span id="apellidos">
              <Translate contentKey="appKaazarApp.cuentaCliente.apellidos">Apellidos</Translate>
            </span>
          </dt>
          <dd>{cuentaClienteEntity.apellidos}</dd>
          <dt>
            <Translate contentKey="appKaazarApp.cuentaCliente.carritoCliente">Carrito Cliente</Translate>
          </dt>
          <dd>{cuentaClienteEntity.carritoCliente ? cuentaClienteEntity.carritoCliente.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/cuenta-cliente" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cuenta-cliente/${cuentaClienteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cuentaCliente }: IRootState) => ({
  cuentaClienteEntity: cuentaCliente.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CuentaClienteDetail);
