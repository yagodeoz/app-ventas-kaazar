import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cuenta-cliente.reducer';
import { ICuentaCliente } from 'app/shared/model/cuenta-cliente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICuentaClienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CuentaCliente = (props: ICuentaClienteProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { cuentaClienteList, match, loading } = props;
  return (
    <div>
      <h2 id="cuenta-cliente-heading">
        <Translate contentKey="appKaazarApp.cuentaCliente.home.title">Cuenta Clientes</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="appKaazarApp.cuentaCliente.home.createLabel">Create new Cuenta Cliente</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {cuentaClienteList && cuentaClienteList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.cuentaCliente.usuario">Usuario</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.cuentaCliente.clave">Clave</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.cuentaCliente.avatar">Avatar</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.cuentaCliente.fechaUltimoAcceso">Fecha Ultimo Acceso</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.cuentaCliente.nombres">Nombres</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.cuentaCliente.apellidos">Apellidos</Translate>
                </th>
                <th>
                  <Translate contentKey="appKaazarApp.cuentaCliente.carritoCliente">Carrito Cliente</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cuentaClienteList.map((cuentaCliente, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cuentaCliente.id}`} color="link" size="sm">
                      {cuentaCliente.id}
                    </Button>
                  </td>
                  <td>{cuentaCliente.usuario}</td>
                  <td>{cuentaCliente.clave}</td>
                  <td>{cuentaCliente.avatar}</td>
                  <td>
                    {cuentaCliente.fechaUltimoAcceso ? (
                      <TextFormat type="date" value={cuentaCliente.fechaUltimoAcceso} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{cuentaCliente.nombres}</td>
                  <td>{cuentaCliente.apellidos}</td>
                  <td>
                    {cuentaCliente.carritoCliente ? (
                      <Link to={`carrito-cliente/${cuentaCliente.carritoCliente.id}`}>{cuentaCliente.carritoCliente.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cuentaCliente.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cuentaCliente.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cuentaCliente.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="appKaazarApp.cuentaCliente.home.notFound">No Cuenta Clientes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ cuentaCliente }: IRootState) => ({
  cuentaClienteList: cuentaCliente.entities,
  loading: cuentaCliente.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CuentaCliente);
