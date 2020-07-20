import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './carrito-cliente.reducer';
import { ICarritoCliente } from 'app/shared/model/carrito-cliente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarritoClienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CarritoCliente = (props: ICarritoClienteProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { carritoClienteList, match, loading } = props;
  return (
    <div>
      <h2 id="carrito-cliente-heading">
        <Translate contentKey="appKaazarApp.carritoCliente.home.title">Carrito Clientes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="appKaazarApp.carritoCliente.home.createLabel">Create new Carrito Cliente</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {carritoClienteList && carritoClienteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.carritoCliente.fechaAcceso">Fecha Acceso</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.carritoCliente.fechaUltimaCompra">Fecha Ultima Compra</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {carritoClienteList.map((carritoCliente, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${carritoCliente.id}`} color="link" size="sm">
                      {carritoCliente.id}
                    </Button>
                  </td>
                  <td>
                    {carritoCliente.fechaAcceso ? (
                      <TextFormat type="date" value={carritoCliente.fechaAcceso} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {carritoCliente.fechaUltimaCompra ? (
                      <TextFormat type="date" value={carritoCliente.fechaUltimaCompra} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${carritoCliente.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${carritoCliente.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${carritoCliente.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="appKaazarApp.carritoCliente.home.notFound">No Carrito Clientes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ carritoCliente }: IRootState) => ({
  carritoClienteList: carritoCliente.entities,
  loading: carritoCliente.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarritoCliente);
