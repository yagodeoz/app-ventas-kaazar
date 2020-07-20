import { IProductos } from 'app/shared/model/productos.model';

export interface IEmpresa {
  id?: number;
  nombreEmpresa?: string;
  rucEmpresa?: string;
  direccion?: string;
  logoContentType?: string;
  logo?: any;
  colorTema?: string;
  productos?: IProductos[];
}

export const defaultValue: Readonly<IEmpresa> = {};
