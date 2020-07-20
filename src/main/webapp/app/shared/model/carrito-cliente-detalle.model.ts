import { ICarritoCliente } from 'app/shared/model/carrito-cliente.model';
import { IProductos } from 'app/shared/model/productos.model';

export interface ICarritoClienteDetalle {
  id?: number;
  cantidad?: number;
  total?: number;
  carritoCliente?: ICarritoCliente;
  productos?: IProductos;
}

export const defaultValue: Readonly<ICarritoClienteDetalle> = {};
