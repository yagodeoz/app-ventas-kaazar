import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './carrito-cliente.reducer';
import { ICarritoCliente } from 'app/shared/model/carrito-cliente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarritoClienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarritoClienteDetail = (props: ICarritoClienteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { carritoClienteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="appKaazarApp.carritoCliente.detail.title">CarritoCliente</Translate> [<b>{carritoClienteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fechaAcceso">
              <Translate contentKey="appKaazarApp.carritoCliente.fechaAcceso">Fecha Acceso</Translate>
            </span>
          </dt>
          <dd>
            {carritoClienteEntity.fechaAcceso ? (
              <TextFormat value={carritoClienteEntity.fechaAcceso} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fechaUltimaCompra">
              <Translate contentKey="appKaazarApp.carritoCliente.fechaUltimaCompra">Fecha Ultima Compra</Translate>
            </span>
          </dt>
          <dd>
            {carritoClienteEntity.fechaUltimaCompra ? (
              <TextFormat value={carritoClienteEntity.fechaUltimaCompra} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/carrito-cliente" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/carrito-cliente/${carritoClienteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ carritoCliente }: IRootState) => ({
  carritoClienteEntity: carritoCliente.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarritoClienteDetail);
