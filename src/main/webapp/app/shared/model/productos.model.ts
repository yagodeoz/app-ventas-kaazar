import { ICarritoClienteDetalle } from 'app/shared/model/carrito-cliente-detalle.model';
import { IEmpresa } from 'app/shared/model/empresa.model';

export interface IProductos {
  id?: number;
  descripcionProducto?: string;
  imagenProductoContentType?: string;
  imagenProducto?: any;
  precioProducto?: number;
  valorIva?: number;
  valorICE?: number;
  descuento?: number;
  noVisitas?: number;
  carritoClienteDetalles?: ICarritoClienteDetalle[];
  empresa?: IEmpresa;
}

export const defaultValue: Readonly<IProductos> = {};
