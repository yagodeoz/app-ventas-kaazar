import { Moment } from 'moment';
import { ICarritoClienteDetalle } from 'app/shared/model/carrito-cliente-detalle.model';
import { ICuentaCliente } from 'app/shared/model/cuenta-cliente.model';

export interface ICarritoCliente {
  id?: number;
  fechaAcceso?: string;
  fechaUltimaCompra?: string;
  carritoClienteDetalles?: ICarritoClienteDetalle[];
  cuentaCliente?: ICuentaCliente;
}

export const defaultValue: Readonly<ICarritoCliente> = {};
