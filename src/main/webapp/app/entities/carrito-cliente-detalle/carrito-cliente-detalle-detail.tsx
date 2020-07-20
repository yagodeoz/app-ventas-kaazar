import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './carrito-cliente-detalle.reducer';
import { ICarritoClienteDetalle } from 'app/shared/model/carrito-cliente-detalle.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarritoClienteDetalleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarritoClienteDetalleDetail = (props: ICarritoClienteDetalleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { carritoClienteDetalleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="appKaazarApp.carritoClienteDetalle.detail.title">CarritoClienteDetalle</Translate> [
          <b>{carritoClienteDetalleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cantidad">
              <Translate contentKey="appKaazarApp.carritoClienteDetalle.cantidad">Cantidad</Translate>
            </span>
          </dt>
          <dd>{carritoClienteDetalleEntity.cantidad}</dd>
          <dt>
            <span id="total">
              <Translate contentKey="appKaazarApp.carritoClienteDetalle.total">Total</Translate>
            </span>
          </dt>
          <dd>{carritoClienteDetalleEntity.total}</dd>
          <dt>
            <Translate contentKey="appKaazarApp.carritoClienteDetalle.carritoCliente">Carrito Cliente</Translate>
          </dt>
          <dd>{carritoClienteDetalleEntity.carritoCliente ? carritoClienteDetalleEntity.carritoCliente.id : ''}</dd>
          <dt>
            <Translate contentKey="appKaazarApp.carritoClienteDetalle.productos">Productos</Translate>
          </dt>
          <dd>{carritoClienteDetalleEntity.productos ? carritoClienteDetalleEntity.productos.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/carrito-cliente-detalle" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/carrito-cliente-detalle/${carritoClienteDetalleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ carritoClienteDetalle }: IRootState) => ({
  carritoClienteDetalleEntity: carritoClienteDetalle.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarritoClienteDetalleDetail);
