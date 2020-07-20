import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './productos.reducer';
import { IProductos } from 'app/shared/model/productos.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductosDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductosDetail = (props: IProductosDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productosEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="appKaazarApp.productos.detail.title">Productos</Translate> [<b>{productosEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="descripcionProducto">
              <Translate contentKey="appKaazarApp.productos.descripcionProducto">Descripcion Producto</Translate>
            </span>
          </dt>
          <dd>{productosEntity.descripcionProducto}</dd>
          <dt>
            <span id="imagenProducto">
              <Translate contentKey="appKaazarApp.productos.imagenProducto">Imagen Producto</Translate>
            </span>
          </dt>
          <dd>
            {productosEntity.imagenProducto ? (
              <div>
                {productosEntity.imagenProductoContentType ? (
                  <a onClick={openFile(productosEntity.imagenProductoContentType, productosEntity.imagenProducto)}>
                    <img
                      src={`data:${productosEntity.imagenProductoContentType};base64,${productosEntity.imagenProducto}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {productosEntity.imagenProductoContentType}, {byteSize(productosEntity.imagenProducto)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="precioProducto">
              <Translate contentKey="appKaazarApp.productos.precioProducto">Precio Producto</Translate>
            </span>
          </dt>
          <dd>{productosEntity.precioProducto}</dd>
          <dt>
            <span id="valorIva">
              <Translate contentKey="appKaazarApp.productos.valorIva">Valor Iva</Translate>
            </span>
          </dt>
          <dd>{productosEntity.valorIva}</dd>
          <dt>
            <span id="valorICE">
              <Translate contentKey="appKaazarApp.productos.valorICE">Valor ICE</Translate>
            </span>
          </dt>
          <dd>{productosEntity.valorICE}</dd>
          <dt>
            <span id="descuento">
              <Translate contentKey="appKaazarApp.productos.descuento">Descuento</Translate>
            </span>
          </dt>
          <dd>{productosEntity.descuento}</dd>
          <dt>
            <span id="noVisitas">
              <Translate contentKey="appKaazarApp.productos.noVisitas">No Visitas</Translate>
            </span>
          </dt>
          <dd>{productosEntity.noVisitas}</dd>
          <dt>
            <Translate contentKey="appKaazarApp.productos.empresa">Empresa</Translate>
          </dt>
          <dd>{productosEntity.empresa ? productosEntity.empresa.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/productos" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/productos/${productosEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ productos }: IRootState) => ({
  productosEntity: productos.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductosDetail);
