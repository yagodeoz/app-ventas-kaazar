import { Moment } from 'moment';
import { ICarritoCliente } from 'app/shared/model/carrito-cliente.model';

export interface ICuentaCliente {
  id?: number;
  usuario?: string;
  clave?: string;
  avatar?: string;
  fechaUltimoAcceso?: string;
  nombres?: string;
  apellidos?: string;
  carritoCliente?: ICarritoCliente;
}

export const defaultValue: Readonly<ICuentaCliente> = {};
