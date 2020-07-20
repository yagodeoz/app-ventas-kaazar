import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CarritoClienteDetalle from './carrito-cliente-detalle';
import CarritoClienteDetalleDetail from './carrito-cliente-detalle-detail';
import CarritoClienteDetalleUpdate from './carrito-cliente-detalle-update';
import CarritoClienteDetalleDeleteDialog from './carrito-cliente-detalle-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CarritoClienteDetalleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CarritoClienteDetalleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CarritoClienteDetalleDetail} />
      <ErrorBoundaryRoute path={match.url} component={CarritoClienteDetalle} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CarritoClienteDetalleDeleteDialog} />
  </>
);

export default Routes;
