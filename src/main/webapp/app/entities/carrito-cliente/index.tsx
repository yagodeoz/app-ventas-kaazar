import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CarritoCliente from './carrito-cliente';
import CarritoClienteDetail from './carrito-cliente-detail';
import CarritoClienteUpdate from './carrito-cliente-update';
import CarritoClienteDeleteDialog from './carrito-cliente-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CarritoClienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CarritoClienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CarritoClienteDetail} />
      <ErrorBoundaryRoute path={match.url} component={CarritoCliente} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CarritoClienteDeleteDialog} />
  </>
);

export default Routes;
