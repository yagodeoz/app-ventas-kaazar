import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Empresa from './empresa';
import EmpresaDetail from './empresa-detail';
import EmpresaUpdate from './empresa-update';
import EmpresaDeleteDialog from './empresa-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmpresaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmpresaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmpresaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Empresa} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmpresaDeleteDialog} />
  </>
);

export default Routes;
