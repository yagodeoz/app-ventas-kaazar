import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmpresa } from 'app/shared/model/empresa.model';
import { getEntities as getEmpresas } from 'app/entities/empresa/empresa.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './productos.reducer';
import { IProductos } from 'app/shared/model/productos.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductosUpdate = (props: IProductosUpdateProps) => {
  const [empresaId, setEmpresaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productosEntity, empresas, loading, updating } = props;

  const { imagenProducto, imagenProductoContentType } = productosEntity;

  const handleClose = () => {
    props.history.push('/productos');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getEmpresas();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productosEntity,
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
          <h2 id="appKaazarApp.productos.home.createOrEditLabel">
            <Translate contentKey="appKaazarApp.productos.home.createOrEditLabel">Create or edit a Productos</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productosEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="productos-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="productos-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descripcionProductoLabel" for="productos-descripcionProducto">
                  <Translate contentKey="appKaazarApp.productos.descripcionProducto">Descripcion Producto</Translate>
                </Label>
                <AvField id="productos-descripcionProducto" type="text" name="descripcionProducto" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="imagenProductoLabel" for="imagenProducto">
                    <Translate contentKey="appKaazarApp.productos.imagenProducto">Imagen Producto</Translate>
                  </Label>
                  <br />
                  {imagenProducto ? (
                    <div>
                      {imagenProductoContentType ? (
                        <a onClick={openFile(imagenProductoContentType, imagenProducto)}>
                          <img src={`data:${imagenProductoContentType};base64,${imagenProducto}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {imagenProductoContentType}, {byteSize(imagenProducto)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('imagenProducto')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_imagenProducto" type="file" onChange={onBlobChange(true, 'imagenProducto')} accept="image/*" />
                  <AvInput type="hidden" name="imagenProducto" value={imagenProducto} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="precioProductoLabel" for="productos-precioProducto">
                  <Translate contentKey="appKaazarApp.productos.precioProducto">Precio Producto</Translate>
                </Label>
                <AvField id="productos-precioProducto" type="string" className="form-control" name="precioProducto" />
              </AvGroup>
              <AvGroup>
                <Label id="valorIvaLabel" for="productos-valorIva">
                  <Translate contentKey="appKaazarApp.productos.valorIva">Valor Iva</Translate>
                </Label>
                <AvField id="productos-valorIva" type="string" className="form-control" name="valorIva" />
              </AvGroup>
              <AvGroup>
                <Label id="valorICELabel" for="productos-valorICE">
                  <Translate contentKey="appKaazarApp.productos.valorICE">Valor ICE</Translate>
                </Label>
                <AvField id="productos-valorICE" type="string" className="form-control" name="valorICE" />
              </AvGroup>
              <AvGroup>
                <Label id="descuentoLabel" for="productos-descuento">
                  <Translate contentKey="appKaazarApp.productos.descuento">Descuento</Translate>
                </Label>
                <AvField id="productos-descuento" type="string" className="form-control" name="descuento" />
              </AvGroup>
              <AvGroup>
                <Label id="noVisitasLabel" for="productos-noVisitas">
                  <Translate contentKey="appKaazarApp.productos.noVisitas">No Visitas</Translate>
                </Label>
                <AvField id="productos-noVisitas" type="string" className="form-control" name="noVisitas" />
              </AvGroup>
              <AvGroup>
                <Label for="productos-empresa">
                  <Translate contentKey="appKaazarApp.productos.empresa">Empresa</Translate>
                </Label>
                <AvInput id="productos-empresa" type="select" className="form-control" name="empresa.id">
                  <option value="" key="0" />
                  {empresas
                    ? empresas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/productos" replace color="info">
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
  empresas: storeState.empresa.entities,
  productosEntity: storeState.productos.entity,
  loading: storeState.productos.loading,
  updating: storeState.productos.updating,
  updateSuccess: storeState.productos.updateSuccess,
});

const mapDispatchToProps = {
  getEmpresas,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductosUpdate);
