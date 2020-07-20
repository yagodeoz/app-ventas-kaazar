import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CuentaCliente from './cuenta-cliente';
import CuentaClienteDetail from './cuenta-cliente-detail';
import CuentaClienteUpdate from './cuenta-cliente-update';
import CuentaClienteDeleteDialog from './cuenta-cliente-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CuentaClienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CuentaClienteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CuentaClienteDetail} />
      <ErrorBoundaryRoute path={match.url} component={CuentaCliente} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CuentaClienteDeleteDialog} />
  </>
);

export default Routes;
