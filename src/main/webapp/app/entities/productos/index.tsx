import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Productos from './productos';
import ProductosDetail from './productos-detail';
import ProductosUpdate from './productos-update';
import ProductosDeleteDialog from './productos-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductosDetail} />
      <ErrorBoundaryRoute path={match.url} component={Productos} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProductosDeleteDialog} />
  </>
);

export default Routes;
