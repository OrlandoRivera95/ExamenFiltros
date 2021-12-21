import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Factura} from './factura.model';
import {Producto} from './producto.model';

@model({settings: {strict: false}})
export class Detallefactura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  facturaid: string;

  @property({
    type: 'string',
    required: true,
  })
  productoid: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => Factura)
  facturaId: string;

  @belongsTo(() => Producto)
  productoId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Detallefactura>) {
    super(data);
  }
}

export interface DetallefacturaRelations {
  // describe navigational properties here
}

export type DetallefacturaWithRelations = Detallefactura & DetallefacturaRelations;
