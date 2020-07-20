import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/empresa">
      <Translate contentKey="global.menu.entities.empresa" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/cuenta-cliente">
      <Translate contentKey="global.menu.entities.cuentaCliente" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/productos">
      <Translate contentKey="global.menu.entities.productos" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/carrito-cliente">
      <Translate contentKey="global.menu.entities.carritoCliente" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/carrito-cliente-detalle">
      <Translate contentKey="global.menu.entities.carritoClienteDetalle" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
