import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Empresa from './empresa';
import CuentaCliente from './cuenta-cliente';
import Productos from './productos';
import CarritoCliente from './carrito-cliente';
import CarritoClienteDetalle from './carrito-cliente-detalle';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}empresa`} component={Empresa} />
      <ErrorBoundaryRoute path={`${match.url}cuenta-cliente`} component={CuentaCliente} />
      <ErrorBoundaryRoute path={`${match.url}productos`} component={Productos} />
      <ErrorBoundaryRoute path={`${match.url}carrito-cliente`} component={CarritoCliente} />
      <ErrorBoundaryRoute path={`${match.url}carrito-cliente-detalle`} component={CarritoClienteDetalle} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
